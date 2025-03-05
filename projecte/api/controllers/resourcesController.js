import { readData, writeData } from "../services/fileServices.js";
const RESOURCES_DB = "./db/resources.json"
import { v4 as uuidv4 } from 'uuid';
import logServices from "../services/logServices.js";

function checkId (object, id) {
    return Object.keys(object)[0] === id
}

function getResources(req, res) {
    logServices.info("Trying to retrieve resources");
    res.status(200).json({
        message: "Resources retrieved successfully",
        resources: readData(RESOURCES_DB)
    });
}

function getResourceById(req, res) {
    const resources = readData(RESOURCES_DB)
    const id = req.params.id;
    const target = resources.find((resourceObj) => checkId(resourceObj, id));
    if (!target) {
        return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Resource retrieved successfully", resource: target });
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

function deleteResource(req, res) {
    logServices.info("Trying to delete resource with id: " + req.params.id);
    const id = req.params.id;
    try {
        const resources = readData(RESOURCES_DB);
        // Find resource index by id 
        const index = resources.findIndex(resourceObj => checkId(resourceObj, id));
        if (index === -1) {
            return res.status(404).json({ message: "Resource not found" });
        }
        resources.splice(index, 1);
        writeData(RESOURCES_DB, resources);
        logServices.success("Resource deleted successfully");
        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        logServices.error("Failed to delete resource: " + error.message);
        res.status(500).json({
            message: "Failed to delete resource",
            error: error.message
        });
    }
}

function updateResource(req, res) {
    const id = req.params.id;
    logServices.info("Trying to update resource with id: " + id);
    try {
        const resources = readData(RESOURCES_DB);
        const index = resources.findIndex(resourceObj => Object.keys(resourceObj)[0] === id);
        if (index === -1) {
            return res.status(404).json({ message: "Resource not found" })
        }
        resources.splice(index, 1);
        const updatedResource = {
            [id]: {
                ...req.body,
                date: new Date()
            }
        };
        resources[index] = updatedResource;
        writeData(RESOURCES_DB, resources);
        logServices.success("Resource updated successfully");
        res.status(200).json({
            message: "Resource updated successfully",
            resource: updatedResource
        });
    } catch (error) {
        logServices.error("Failed to update notification:" + error.message);
        res.status(500).json({
            message: "Failed to update notification",
            error: error.message
        });
    }
}

export { getResources, getResourceById, addResource, deleteResource, updateResource };
