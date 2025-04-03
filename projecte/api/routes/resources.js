import express from 'express';
import ResourceController from '../controllers/resourcesController.js';
import ResourceControllerView from '../controllers/ControllersWithViews/resourcesControllerView.js';

const router = express.Router();
const routerView = express.Router();

const resourceController = new ResourceController();
const resoutrceControllerView = new ResourceControllerView();

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

// View with ejs
routerView.get('/', (req, res) => {
  resoutrceControllerView.getAll(req, res);
});

routerView.get('/:id', (req, res) => {
  resoutrceControllerView.getOne(req, res);
});

routerView.post('/', (req, res) => {
  resoutrceControllerView.add(req, res);
});

routerView.put('/:id', (req, res) => {
  resoutrceControllerView.update(req, res);
});

routerView.delete('/:id', (req, res) => {
  resoutrceControllerView.delete(req, res);
});


export {router, routerView};