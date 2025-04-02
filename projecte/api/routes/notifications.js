import express from 'express';
import NotificationController from '../controllers/notificationsController.js';

const router = express.Router();
const notificationController = new NotificationController();

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

export default router;