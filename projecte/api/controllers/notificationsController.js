import { readData, writeData } from "../services/fileServices.js";
import { v4 as uuidv4 } from 'uuid';
const NOTIFICATIONS_BD = "./db/notifications.json"


function getNotifications(req, res) {
    res.status(200).json({
        message: "Notifications retrieved successfully",
        notifications: readData(NOTIFICATIONS_BD)
    });
}

function searchById(DB, id) {
    return readData(DB).find((element) => element.id === id);
}

function addNotification(req, res) {
    const id = uuidv4();
    const newNotification = {
        [id]: { 
            ...req.body,
            date: new Date()
        }
    };
    const notificationData = newNotification[id];

    // Validate data
    if (!notificationData.userId || !notificationData.resourceId || !notificationData.message || !notificationData.message.trim()) {
        return res.status(400).json({
            message: "Invalid notification data. userId, resourceId, and message are required. Ids must be a valid UUID."
        });
    }

    // Check if user exists
    let user = searchById("./db/users.json", notificationData.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if resource exists
    let resource = searchById("./db/resources.json", notificationData.resourceId);
    if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
    }

    try {
        const currentNotifications = readData(NOTIFICATIONS_BD);

        const updatedNotifications = { ...currentNotifications, ...newNotification };

        writeData(NOTIFICATIONS_BD, updatedNotifications);

        res.status(201).json({
            message: "Notification added successfully",
            notification: newNotification
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add notification",
            error: error.message
        });
    }
}


export { getNotifications, addNotification };