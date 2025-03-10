import GenericController from "./genericController.js";

class UserController extends GenericController{
    constructor() {
        super('user');
        this.propstext = 'name, email, password and role (admin or client)';
    }
    parseData(data){
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
            data.role = "client";
        } else {
            if(data.role !== "client" && data.role !== "admin") {
                return null;
            }
        }
        return data
    }
}

export default UserController;
