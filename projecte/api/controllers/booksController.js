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
        if (!this.resourceExists(data.resourceId)) return null;

        logServices.info(`userId: ${data.userId}`);
        if (!this.userExists(data.userId)) return null;

        logServices.success(`Data parsed successfully`);
        return data;
    }

    resourceExists(resourceId) {
        const resourcesPath = path.resolve("db/resources.json");
        const resources = JSON.parse(fs.readFileSync(resourcesPath, "utf-8"));
        return resources.some(resource => this.checkId(resource, resourceId));
    }

    userExists(userId) {
        const usersPath = path.resolve("db/users.json");
        const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
        return users.some(user => this.checkId(user, userId));
    
    }
}

export default BookController;