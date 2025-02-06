import { readData, writeData } from "../services/fileServices.js";
const USERS_BD = "./db/users.json";
import { v4 as uuidv4 } from 'uuid';

function getUsers(req, res) {
    res.status(200).json({
        message: "Users retrieved successfully",
        users: readData(USERS_BD)
    });
}


function addUser(req, res) {
    const newUser = { id: uuidv4(), ...req.body };
    // Validate data
    if (!newUser.name || !newUser.name.trim() 
        || !newUser.email || !newUser.email.trim() 
        || !newUser.password || !newUser.password.trim()) {
        return res.status(400).json({
            message: "Invalid user data. name, email and password are required."
        });
    }
    // Validate email
    if (newUser.email.indexOf('@') === -1 || newUser.email.indexOf('.') === -1) {
        return res.status(400).json({
            message: "Invalid email, please check the format"
        });
    }
    // Validate password
    if (newUser.password.lenght < 8) {
        return res.status(400).json({
            message: "Invalid password, please check the format"
        });
    }
    // Validate rol or set default
    if(!newUser.role || !newUser.role.trim()) {
        newUser.role = "client";
    } else {
        if(newUser.role !== "client" || newUser.role !== "admin") {
            return res.status(400).json({
                message: "Invalid role, please check the format"
            });
        }
    }
    // Save data
    try {
        const updatedUsers = [...readData(USERS_BD), newUser];
        writeData(USERS_BD, updatedUsers);
        res.status(201).json({
            message: "User added successfully",
            user: newUser
        });
    } catch (error) {

        res.status(500).json({
            message: "Failed to add user",
            error: error.message
        });
    }
};

export { getUsers, addUser };