import { readData, writeData } from "../services/fileServices.js";
import { v4 as uuidv4 } from 'uuid';
import logServices from "../services/logServices.js";
import fs from "fs";
import path from "path";
const baseURL = process.env.BASE_URL || 'http://localhost:3010';

class GenericController {
	dbFile = '';
	entityName = '';
	propstext = 'props';

	constructor(entityName, hasQueryParams = false) {
		this.dbFile = `db/${entityName}s.json`;
		this.entityName = entityName;
		this.hasQueryParams = hasQueryParams;
	}

	checkId(object, id) {
		return Object.keys(object)[0] === id
	}

	async getAll(req, res) {
		try {
			const query = req.query;

			const data = await readData(this.dbFile);

			const filteredData = this.handleQueryParams(query, data);

			res.status(200).json({
				message: `${this.entityName}s retrieved successfully`,
				[`${this.entityName}s`]: filteredData
			});
		} catch (error) {
			console.log(error)
			res.status(500).json({
				message: `Something went wrong retrieving the ${this.entityName}s`,
				error: error
			});
		}
	}

	async getOne(req, res) {
		try {
			const id = req.params.id;
			const data = await readData(this.dbFile);

			const item = Object.entries(data).find(([key, value]) => key === id);
			const itemBody = item ? { [item[0]]: item[1] } : null;
			if (!item) {
				return res.status(404).json({ message: `${this.entityName} not found`});
			}
			res.status(200).json({
				message: `${this.entityName} retrieved successfully`,
				[this.entityName] : itemBody
			});
		} catch (error) {
			console.log(error)
			res.status(500).json({
				message: `Something went wrong retrieving the ${this.entityName}`,
				error: error
			});
		}
	}

	async add(req, res) {
		try {
			// Creates new object
			const id = uuidv4();
			const newItem = { 
				[id]: { 
					...req.body,
					date: new Date()
				}
			};
			// Validate data
			newItem[id] = this.parseData(newItem[id]);
			if(!newItem[id]) { // Invalid data
				return res.status(400).json({
					message: `Invalid ${this.entityName} data. ${this.propstext} are required.`
				});
			}
			// Get data from file and update it
			const data = await readData(this.dbFile);
			data.push(newItem);
			writeData(this.dbFile, data);
			
			// Response
			res.status(201).json({
				message: `${this.entityName} added successfully`,
				[this.entityName]: newItem
			});
		} catch (error) {
			console.log(error)
			res.status(500).json({
				message: `Failed to add ${this.entityName}`,
				error: error.message
			});
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			// Read data from file and search for the obj
			const data = await readData(this.dbFile);
			const index = data.findIndex(obj => Object.keys(obj)[0] === id);
			if (index === -1) {
				return res.status(404).json({ error: 'No encontrado' });
			}
			// Update each attribute in the existing item with the values from req.body
			const updatedItem = { ...data[index] };
			Object.keys(req.body).forEach(key => {
				updatedItem[id][key] = req.body[key];
			});
			updatedItem[id].date = new Date();

			// Parse the updated data
			updatedItem[id] = this.parseData(updatedItem[id]);
			if (!updatedItem[id]) {
				return res.status(400).json({
					message: `Invalid ${this.entityName} data. ${this.propstext} are required.`
				});
			}
			// Update the obj with the new data and write it to the file
			data[index] = updatedItem;
			writeData(this.dbFile, data);
			res.status(200).json({
				message: `${this.entityName} with id ${id} updated successfully`,
				[this.entityName]: updatedItem
			});
		} catch (error) {
			console.log(error)
			res.status(500).json({
				message: `Failed to update ${this.entityName}`,
				error: error.message
			});
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;

			const data = await readData(this.dbFile);

			const index = Object.keys(data).findIndex(key => key == id);
			if (index === -1) {
				return res.status(404).json({ message: `Could not found a ${this.entityName} with ${id}` });
			}

			const dataArray = Object.entries(data);
			dataArray.splice(index, 1);
			const updatedData = Object.fromEntries(dataArray);
			writeData(this.dbFile, updatedData);

			res.status(200).json({ message: `${this.entityName} with id ${id} deleted successfully` });
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Something went wrong', error: error.message });
		}
	}

	// This method is used to filter the data based on the query parameters
	// It checks if the class is marked to hanlded query parameters and if not it returns the data as is
	handleQueryParams(query, data) {
		if (this.hasQueryParams) {
			throw new Error('The "handleQueryParams" method is not implemented in the child class. Please implement the method in the child class if you want to use them.');
		} else {
			return data;
		}
	}

	// Validates if the data has the required properties. Used before adding it to the database
	parseData(data) {
		throw new Error('The "parseData" method is not implemented in the child class. Please implement the method in the child class.');
	}

	entityExists(entityId, entityType) {
		logServices.info(`Checking for db db/${entityType}s.json`);
		const entityPath = path.resolve(`db/${entityType}s.json`);
		const entities = JSON.parse(fs.readFileSync(entityPath, "utf-8"));
		return entities.some(entity => this.checkId(entity, entityId));
	}
}

export default GenericController;
