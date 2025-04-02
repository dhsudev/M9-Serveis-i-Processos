import logServices from "../services/logServices.js";
import GenericController from "./genericController.js";

class UserController extends GenericController{
    constructor() {
        super('user');
        this.propstext = 'name, email, password and role (admin or client)';
    }
    parseData(data){
        logServices.info(`Parsing data of properties ${this.entityName}`);

        logServices.info(`Cheching if name, email, password and role are not empty`);
        if (!data.name || !data.name.trim() 
            || !data.email || !data.email.trim() 
            || !data.password || !data.password.trim()) {
            return null;
        }
        // Validate email
        if (data.email.indexOf('@') === -1 || data.email.indexOf('.') === -1) {
            return null;
        }
        // Validate password
        if (data.password.length < 8) {
            return null;
        }
        // Validate rol or set default
        if(!data.role) {
            logServices.info(`Setting default role to client`);
            data.role = "client";
        } else {
            logServices.info(`Cheching if existing role is valid`);
            if(data.role !== "client" && data.role !== "admin") {
                return null;
            }
        }
        logServices.success(`Data parsed successfully`);
        return data
    }
}

export default UserController;
