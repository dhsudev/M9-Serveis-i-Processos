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


// View with EJS
routerView.get('/', (req, res) => {
    userControllerView.getAll(req, res);
});

// Colocar rutas fijas antes de las dinámicas:
routerView.get('/add', (req, res) => {
    userControllerView.add(req, res);
});
routerView.get('/edit/:id', (req, res) => {
    userControllerView.edit(req, res);
});

// Rutas dinámicas deben ir después:
routerView.get('/:id', (req, res) => {
    userControllerView.getOne(req, res);
});
routerView.post('/update/:id', (req, res) => {
    userControllerView.update(req, res);
});
routerView.delete('/:id', (req, res) => {
    userControllerView.delete(req, res);
});


export { router, routerView };
