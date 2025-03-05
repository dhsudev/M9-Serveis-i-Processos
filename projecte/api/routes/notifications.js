
import express from 'express';
import { getNotifications, addNotification, getNotificationById, updateNotification, deleteNotification } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.id) {
        getNotifications(req, res);
    } else {
        getNotificationById(req, res);
    }
});
router.post('/', addNotification);  
router.put('/:id', updateNotification); 
router.delete('/:id', deleteNotification);  

export default router;
