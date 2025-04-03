import express from 'express';
import UserController from '../controllers/usersController.js';
import UserControllerView from '../controllers/ControllersWithViews/usersControllerView.js';

const router = express.Router();
const routerView = express.Router();

const userController = new UserController();
const userControllerView = new UserControllerView();

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


// View with ejs
routerView.get('/', (req, res) => {
    userControllerView.getAll(req, res);
});

routerView.get('/:id', (req, res) => {
    userControllerView.getOne(req, res);
});

routerView.post('/', (req, res) => {
    userControllerView.add(req, res);
});

routerView.put('/:id', (req, res) => {
    userControllerView.update(req, res);
});

routerView.delete('/:id', (req, res) => {
    userControllerView.delete(req, res);
});


export { router, routerView };
