import { readData, writeData } from "../services/fileServices.js";
const RESOURCES_DB = "./db/resources.json"
import { v4 as uuidv4 } from 'uuid';

function getResources(req, res) {
    console.log("hola")
    res.status(200).json({ 
        message: "Resources retrieved successfully",
        resources: readData(RESOURCES_DB)
    });
}

function addResource(req, res) {
    const id = uuidv4();
    const newResource = {
        [id]: { 
            ...req.body,
            date: new Date()
        }
    };
    const resourceData = newResource[id];
    // Validate data
    if (!resourceData.name || !resourceData.name.trim() 
        || !resourceData.status || !resourceData.status.trim()
        || !resourceData.properties || !Array.isArray(resourceData.properties)
    ) {
        return res.status(400).json({
            message: "Invalid resource data. name, status and properties are required. Think that properties must be an array."
        });
    }
    // Save data
    try {
        const updatedResources = [...readData(RESOURCES_DB), newResource];
        writeData(RESOURCES_DB, updatedResources);
        res.status(201).json({
            message: "Resource added successfully",
            resource: newResource
        });
    } catch (error) {

        res.status(500).json({
            message: "Failed to add resource",
            error: error.message
        });
    }
};

export {getResources, addResource};
