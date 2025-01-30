import express from 'express'
import userRoutes from './users.js'
import booksRoutes from './books.js'
import notificationsRoutes from './notifications.js'
import resourcesRoutes from './resources.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/books', booksRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/resources', resourcesRoutes);

export default router;