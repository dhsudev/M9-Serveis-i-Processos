import { readData } from "../services/fileServices.js";
const BOOKS_BD = "./db/books.json"

function getBooks(req, res) {
    res.status(200).json({ 
        message: "Books retrieved successfully",
        books: readData(BOOKS_BD)
    });
}
function getBookById(req, res) {
    const notifications = readData(BOOKS_BD)
    const target = notifications.find((element) => element.id === req.params.id);
    if (!target) {
        return res.status(404).json({ message: "Books not found" });
    }
    res.status(200).json({ message: "Books retrieved successfully", notification: target });
}

function addBook(req, res) {
    const id = uuidv4();
    const newBooks = {
        [id]: { 
            ...req.body,
            date: new Date()
        }
    };
    const notificationData = newBooks[id];

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
        const currentBookss = readData(BOOKS_BD);

        const updatedBookss = { ...currentBookss, ...newBooks };

        writeData(BOOKS_BD, updatedBookss);

        res.status(201).json({
            message: "Books added successfully",
            notification: newBooks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add notification",
            error: error.message
        });
    }
}

function deleteBook(req, res) {
    const { id } = req.params;
    try {
        const currentBookss = readData(BOOKS_BD);
        if (!currentBookss[id]) {
            return res.status(404).json({ message: "Books not found" });
        }
        delete currentBookss[id];
        writeData(BOOKS_BD, currentBookss);
        res.status(200).json({ message: "Books deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete notification",
            error: error.message
        });
    }
}

function updateBook(req, res) {
    const { id } = req.params;
    try {
        const currentBookss = readData(BOOKS_BD);
        if (!currentBookss[id]) {
            return res.status(404).json({ message: "Books not found" });
        }
        const updatedBooks = {
            ...currentBookss[id],
            ...req.body,
            date: new Date()
        };
        currentBookss[id] = updatedBooks;
        writeData(BOOKS_BD, currentBookss);
        res.status(200).json({
            message: "Books updated successfully",
            notification: updatedBooks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update notification",
            error: error.message
        });
    }
}


export {getBooks, getBookById, addBook, updateBook, deleteBook};