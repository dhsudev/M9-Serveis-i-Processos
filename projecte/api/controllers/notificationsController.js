import GenericController from "./genericController.js";

class NotificationController extends GenericController {
  constructor() {
    super("notification");
    this.propstext = "userId, resourceId, message and reservationDate";
  }
  
  parseData(data) {
    logServices.info(`Parsing data of properties ${this.entityName}`);

    logServices.info(`Cheching if userId, resourceId, message and reservationDate are not empty`);
    if (!data.userId || !data.userId.trim()) return null;
    if (!data.resourceId || !data.resourceId.trim()) return null;
    if (!data.message || !data.message.trim()) return null;
    if (!data.reservationDate || !data.reservationDate.trim()) return null;
    logServices.success(`Data parsed successfully`);
    return data;
  }
}

export default NotificationController;