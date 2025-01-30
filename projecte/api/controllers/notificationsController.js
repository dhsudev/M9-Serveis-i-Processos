import { readData } from "../services/fileServices.js";
const NOTIFICATIONS_BD = "./db/notifications.json"

function getNotifications(req, res) {
    res.status(200).json({ 
        message: "Notifications retrieved successfully",
        notifications: readData(NOTIFICATIONS_BD)
    });
}

function addNotification(req, res) {
    return ("hola")
}

export {getNotifications, addNotification};