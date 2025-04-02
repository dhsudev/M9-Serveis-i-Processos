import GenericController from "./genericController.js";
import fs from "fs";
import path from "path";
import logServices from "../services/logServices.js";

class BookController extends GenericController {
    constructor() {
        super("book");
        this.propstext = "resourceId, userId, and day";
    }
    
    parseData(data) {
        logServices.info(`Parsing data of properties ${this.entityName}`);

        logServices.info(`Cheching if resourceId, userId, and day are not empty`);
        if (!data.resourceId || !data.resourceId.trim()) return null;
        if (!data.userId || !data.userId.trim()) return null;
        if (!data.day || !data.day.trim()) return null;

        logServices.info(`Cheching if resource and user exist`);

        logServices.info(`reusourceId: ${data.resourceId}`);
        if (!this.entityExists(data.resourceId, "resource")) return null;

        logServices.info(`userId: ${data.userId}`);
        if (!this.entityExists(data.userId, "user")) return null;

        logServices.success(`Data parsed successfully`);
        return data;
    }
}

export default BookController;