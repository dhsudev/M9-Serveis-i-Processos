import express from 'express';
import UserController from '../controllers/usersController.js';

const router = express.Router();

const userController = new UserController();

router.get('/', (req, res) => {
    userController.getAll(req, res);
});

router.get('/:id', (req, res) => {
    userController.getOne(req, res);
});  

router.post('/', (req, res) => {
    userController.add(req, res);
});

router.put('/:id', (req, res) => {
    userController.update(req, res);
});

router.delete('/:id', (req, res) => {
    userController.delete(req, res);
});


export default router;
