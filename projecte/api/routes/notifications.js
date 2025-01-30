
import express from 'express';
import { getNotifications, addNotification } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/', getNotifications);   // GET /api/notifications
router.post('/', addNotification);   // POST /api/notifications

export default router;
