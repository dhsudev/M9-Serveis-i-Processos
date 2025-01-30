import { readData } from "../services/fileServices.js";
const RESOURCES_DB = "./db/resources.json"

function getResources(req, res) {
    console.log("hola")
    res.status(200).json({ 
        message: "Resources retrieved successfully",
        resources: readData(RESOURCES_DB)
    });
}

function addResource() {
    return ("hola")
}

export {getResources, addResource};
