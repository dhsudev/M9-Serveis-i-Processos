import express from 'express';
import { getUsers, addUser, getUserById, updateUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/:id?', (req, res) => req.params.id ? getUserById(req, res) : getUsers(req, res));
router.post('/', addUser);  
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser);  

export default router;
