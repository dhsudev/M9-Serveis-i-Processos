import { readData } from "../services/fileServices.js";
const BOOKS_BD = "./db/books.json"

function getBooks(req, res) {
    res.status(200).json({ 
        message: "Books retrieved successfully",
        books: readData(BOOKS_BD)
    });
}

function addBook(req, res) {
    return ("hola")
}

export {getBooks, addBook};