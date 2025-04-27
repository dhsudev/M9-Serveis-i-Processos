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
// Endpoint to make sure the server is running
routerApi.get("/status", (request, response) => {
    const status = {
        "Status" : "Running",
        "Avalible EndPoints" : ["/users", "/resources", "/books", "/notifications"] 
    };
    response.status(200).json(status);
})

// Views routes
routerViews.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
})
routerViews.use('/users', userRoutesViews);
routerViews.use('/books', booksRoutesViews);
routerViews.use('/notifications', notificationsRoutesViews);
routerViews.use('/resources', resourcesRoutesViews);

routerViews.get('/templates', (request, response) => {
    const status = {
        templates: [
            {
                entity: "users",
                fields: [
                    { name: "id", type: "integer" },
                    { name: "name", type: "string" },
                    { name: "email", type: "string" },
                    { name: "role", type: "string" }
                ],
                relationships: [
                    { relatedEntity: "notifications", type: "one-to-many" }
                ]
            },
            {
                entity: "books",
                fields: [
                    { name: "id", type: "integer" },
                    { name: "title", type: "string" },
                    { name: "author", type: "string" },
                    { name: "genre", type: "string" }
                ],
                relationships: [
                    { relatedEntity: "resources", type: "many-to-one" }
                ]
            },
            {
                entity: "notifications",
                fields: [
                    { name: "id", type: "integer" },
                    { name: "message", type: "string" },
                    { name: "type", type: "string" },
                    { name: "date", type: "date" }
                ],
                relationships: [
                    { relatedEntity: "users", type: "many-to-one" }
                ]
            },
            {
                entity: "resources",
                fields: [
                    { name: "id", type: "integer" },
                    { name: "name", type: "string" },
                    { name: "type", type: "string" },
                    { name: "url", type: "string" }
                ],
                relationships: [
                    { relatedEntity: "books", type: "one-to-many" }
                ]
            }
        ]
    };
    response.status(200).json(status);
});

export {routerApi, routerViews};