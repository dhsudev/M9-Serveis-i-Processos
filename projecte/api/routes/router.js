import express from 'express'
import userRoutes from './users'
import booksRoutes from './books'
import notificationsRoutes from './notifications'
import resourcesRoutes from './users'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/books', booksRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/resources', resourcesRoutes);

export default router;