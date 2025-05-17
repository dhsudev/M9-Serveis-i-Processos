import express from 'express';
import ResourceController from '../controllers/resourcesController.js';
import ResourceControllerView from '../controllers/ControllersWithViews/resourcesControllerView.js';

const router = express.Router();
const routerView = express.Router();

const resourceController = new ResourceController();
const resourceControllerView = new ResourceControllerView();

router.get('/', (req, res) => {
  resourceController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  resourceController.getOne(req, res);
});

router.post('/', (req, res) => {
  resourceController.add(req, res);
});

router.put('/:id', (req, res) => {
  resourceController.update(req, res);
});

router.delete('/:id', (req, res) => {
  resourceController.delete(req, res);
});

// View with EJS
routerView.get('/', (req, res) => {
    resourceControllerView.getAll(req, res);
});

// Colocar rutas fijas antes de las dinámicas:
routerView.get('/add', (req, res) => {
    resourceControllerView.add(req, res);
});
routerView.get('/edit/:id', (req, res) => {
    resourceControllerView.edit(req, res);
});

// Rutas dinámicas deben ir después:
routerView.get('/:id', (req, res) => {
    resourceControllerView.getOne(req, res);
});
routerView.post('/update/:id', (req, res) => {
    resourceControllerView.update(req, res);
});
routerView.delete('/:id', (req, res) => {
    resourceControllerView.delete(req, res);
});

export { router, routerView };