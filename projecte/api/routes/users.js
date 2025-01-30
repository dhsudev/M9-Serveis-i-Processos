import express from 'express';
import { getUsers, addUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);   // GET /api/users
router.post('/', addUser);   // POST /api/users

export default router;
