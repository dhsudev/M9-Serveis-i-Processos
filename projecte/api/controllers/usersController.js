import { readData } from "../services/fileServices.js";
const USERS_BD = "./db/users.json"

function getUsers(req, res) {
    res.status(200).json({ 
        message: "Users retrieved successfully",
        users: readData(USERS_BD)
    });
}


function addUser(req, res) {
    return ("hola")
}

export {getUsers, addUser};