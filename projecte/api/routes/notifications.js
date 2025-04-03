import express from 'express';
import NotificationController from '../controllers/notificationsController.js';
import NotificationControllerView from '../controllers/ControllersWithViews/notificationsControllerView.js';

const router = express.Router();
const routerView = express.Router();

const notificationController = new NotificationController();
const notificationControllerView = new NotificationControllerView();

router.get('/', (req, res) => {
  notificationController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  notificationController.getOne(req, res);
});

router.post('/', (req, res) => {
  notificationController.add(req, res);
});

router.put('/:id', (req, res) => {
  notificationController.update(req, res);
});

router.delete('/:id', (req, res) => {
  notificationController.delete(req, res);
});

// View with ejs
routerView.get('/', (req, res) => {
  notificationControllerView.getAll(req, res);
});

routerView.get('/:id', (req, res) => {
  notificationControllerView.getOne(req, res);
});

routerView.post('/', (req, res) => {
  notificationControllerView.add(req, res);
});

routerView.put('/:id', (req, res) => {
  notificationControllerView.update(req, res);
});

routerView.delete('/:id', (req, res) => {
  notificationControllerView.delete(req, res);
});


export {router, routerView};