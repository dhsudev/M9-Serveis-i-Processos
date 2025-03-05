import { readData, writeData } from "../services/fileServices.js";
const USERS_BD = "./db/users.json";
import { v4 as uuidv4 } from 'uuid';
import logServices from "../services/logServices.js";

function checkId (object, id) {
    return Object.keys(object)[0] === id
}

function getUsers(req, res) {
    logServices.info("Trying to retrieve users");
    res.status(200).json({
        message: "Users retrieved successfully",
        users: readData(USERS_BD)
    });
}

function getUserById(req, res) {
    const users = readData(USERS_BD)
    const id = req.params.id;
    const target = users.find((userObj) => checkId(userObj, id));
    if (!target) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User retrieved successfully", user: target });
}


function addUser(req, res) {
    const id = uuidv4();
    const newUser = { 
        [id]: { 
            ...req.body,
            date: new Date()
        }
    };
    const userData = newUser[id];
    // Validate data
    if (!userData.name || !userData.name.trim() 
        || !userData.email || !userData.email.trim() 
        || !userData.password || !userData.password.trim()) {
            console.log(newUser);
        return res.status(400).json({
            message: "Invalid user data. name, email and password are required."
        });
    }
    // Validate email
    if (userData.email.indexOf('@') === -1 || userData.email.indexOf('.') === -1) {
        return res.status(400).json({
            message: "Invalid email, please check the format"
        });
    }
    // Validate password
    if (userData.password.lenght < 8) {
        return res.status(400).json({
            message: "Invalid password, please check the format"
        });
    }
    // Validate rol or set default
    if(!userData.role || !userData.role.trim()) {
        newUser[id].role = "client";
    } else {
        if(userData.role !== "client" || userData.role !== "admin") {
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

function deleteUser(req, res) {
    logServices.info("Trying to delete user with id: " + req.params.id);
    const id = req.params.id;
    try {
        const users = readData(USERS_BD);
        // Find resource index by id 
        const index = users.findIndex(userObj => checkId(userObj, id));
        if (index === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        users.splice(index, 1);
        writeData(USERS_BD, users);
        logServices.success("User deleted successfully");
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete User",
            error: error.message
        });
        logServices.error.message("Failed to delete user:" + error.message);
    }
}

function updateUser(req, res) {
    const  id  = req.params.id;
    logServices.info("Trying to update user with id: " + id);
    try {
        const users = readData(USERS_BD);
        const index = users.findIndex(obj => Object.keys(obj)[0] === id);
        if (index === -1) {
            return res.status(404).json({ message: "User not found" })
        }
        users.splice(index, 1);
        const updatedUser = {
            [id]: {
                ...req.body,
                date: new Date()
            }
        };
        users[index] = updatedUser;
        writeData(USERS_BD, users);
        res.status(200).json({
            message: "User updated successfully",
            notification: updatedUser
        });
        logServices.success.message("User updated successfully");
    } catch (error) {
        logServices.error.message("Failed to update notification:" + error.message);
        res.status(500).json({
            message: "Failed to update notification",
            error: error.message
        });
    }
}
export { getUsers, addUser, getUserById, updateUser, deleteUser };