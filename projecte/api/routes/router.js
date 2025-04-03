import express from 'express'
import {router as userRoutes, routerView as userRoutesViews} from './users.js'
import {router as booksRoutes, routerView as booksRoutesViews}from './books.js'
import {router as notificationsRoutes, routerView as notificationsRoutesViews} from './notifications.js'
import {router as resourcesRoutes, routerView as resourcesRoutesViews} from './resources.js'

const routerApi = express.Router();
const routerViews = express.Router();

routerApi.use('/users', userRoutes);
routerApi.use('/books', booksRoutes);
routerApi.use('/notifications', notificationsRoutes);
routerApi.use('/resources', resourcesRoutes);

routerViews.use('/users', userRoutesViews);
routerViews.use('/books', booksRoutesViews);
routerViews.use('/notifications', notificationsRoutesViews);
routerViews.use('/resources', resourcesRoutesViews);


export {routerApi, routerViews};