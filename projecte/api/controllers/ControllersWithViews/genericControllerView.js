import { readData, writeData } from "../../services/fileServices.js";
import { v4 as uuidv4 } from 'uuid';
import logServices from "../../services/logServices.js";
import fs from "fs";
import path from "path";

class GenericControllerView{
	dbFile = '';
	entityName = '';
	propstext = 'props';
	baseURL = process.env.BASE_URL || 'http://localhost:3010';

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
			res.render('list', { entityName : this.entityName, data: filteredData, baseURL: this.baseURL});
		} catch (error) {
			console.log(error)
			this.errorPage(req, res, 500, `Something went wrong retrieving the ${this.entityName}s`);
		}
	}

	async getOne(req, res) {
		try {
			const id = req.params.id;
			const data = await readData(this.dbFile);

			const item = Object.entries(data).find(([key]) => key === id);
			const itemBody = item ? item[1] : null;
			//console.log(itemBody);
			if (!item) {
				const message = `${this.entityName.charAt(0).toUpperCase() + this.entityName.slice(1)} not found`;
				this.errorPage(req, res, 404, message);
				return;
			}
			res.render('detail', { entityName : this.entityName, data: itemBody, baseURL: this.baseURL});
		} catch (error) {
			console.log(error)
			this.errorPage(req, res, 500, `Something went wrong retrieving the ${this.entityName}`);
		}
	}

	async add(req, res) {
		try {
		  // Leer la estructura de la base de datos para pasarla al formulario.
		  const structureData = await readData('db/structure.json');
		  // Suponiendo que en structure.json las tablas están definidas en plural
		  const structure = structureData.tables[`${this.entityName}s`];
		  
		  // Renderizar el formulario para crear un registro nuevo
		  res.render('form', {
			entity: `${this.entityName}s`,
			record: null, // No se pasa ningún registro en este caso
			structure,
			baseURL: this.baseURL
		  });
		} catch (error) {
		  console.log(error);
		  this.errorPage(req, res, 500, `Algo salió mal cargando el formulario para agregar un nuevo ${this.entityName}`);
		}
	  }

	async edit(req, res) {
		try {
		  const id = req.params.id;
		  // Leer todos los datos de la entidad
		  const data = await readData(this.dbFile);
		  // Buscar el registro cuyo id coincida
		  const recordEntry = Object.entries(data).find(([key]) => key === id);
		  if (!recordEntry) {
			return this.errorPage(req, res, 404, `${this.entityName} no encontrado`);
		  }
		  const record = recordEntry[1];
	  
		  // Leer la estructura de la base de datos para pasarla al formulario.
		  const structureData = await readData('db/structure.json');
		  // Suponiendo que en structure.json las tablas están definidas con claves en plural,
		  // se pasa la estructura correspondiente a la entidad.
		  const structure = structureData.tables[`${this.entityName}s`];
		  
		  // Renderizar el formulario y pasar como variables:
		  // - entity (por ejemplo, "books" o "users")
		  // - record: el objeto con los datos para edición
		  // - structure: la estructura de la entidad para generar los campos dinámicamente
		  // - baseURL: para las rutas base
		  res.render('form', { 
			entity: `${this.entityName}s`,
			record, 
			structure, 
			baseURL: this.baseURL 
		  });
		} catch (error) {
		  console.log(error);
		  this.errorPage(req, res, 500, `Algo salió mal cargando el formulario de edición de ${this.entityName}`);
		}
	  }

	async delete(req, res) {
		try {
			const id = req.params.id;

			const data = await readData(this.dbFile);

			const index = Array.isArray(data) ? data.findIndex(userObj => this.checkId(userObj, id)) : -1;
			if (index === -1) {
				return this.errorPage(req, res, 404, `Could not found the ${this.entityName}`);
				//return res.status(404).json({ message: `Could not found a ${this.entityName} with ${id}` });
			}

			data.splice(index, 1);
			writeData(this.dbFile, data);

			res.status(200).json({ message: `${this.entityName} with id ${id} deleted successfully` });
		} catch (error) {
			console.log(error)
			this.errorPage(req, res, 500, `Something went wrong deleting the ${this.entityName}`);
		}
	}

	async errorPage(req, res, code, message){
		res.render('error', { 
			entityName : this.entityName, 
			errorCode : code, 
			errorMessage : message, 
			baseUrl: req.baseUrl
		});
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

export default GenericControllerView;
