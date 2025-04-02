import GenericController from "./genericController.js";
import logServices from "../services/logServices.js";

class NotificationController extends GenericController {
  constructor() {
    super("notification");
    this.propstext = "userId, resourceId and sendDate";
  }
  
  parseData(data) {
    logServices.info(`Parsing data of properties ${this.entityName}`);

    logServices.info(`Cheching if userId, message and date`);
    if (!data.userId || !data.userId.trim()) return null;
    if (!data.message || !data.message.trim()) return null;
    if (!data.sendDate || !data.sendDate.trim()) return null;

    logServices.info(`Cheching if user and user exist`);
    logServices.info(`userId: ${data.userId}`);
    if (!this.entityExists(data.userId, "user")) return null;

    return data;
  }
}

export default NotificationController;