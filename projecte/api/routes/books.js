import express from 'express';
import BookController from '../controllers/booksController.js';
import BookControllerView from '../controllers/ControllersWithViews/booksControllerView.js';

const router = express.Router();
const routerView = express.Router();

const bookController = new BookController();
const bookControllerView = new BookControllerView();

router.get('/', (req, res) => {
  bookController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  bookController.getOne(req, res);
});

router.post('/', (req, res) => {
  bookController.add(req, res);
});

router.put('/:id', (req, res) => {
  bookController.update(req, res);
});

router.delete('/:id', (req, res) => {
  bookController.delete(req, res);
});

// View with EJS
routerView.get('/', (req, res) => {
    bookControllerView.getAll(req, res);
});

// Colocar rutas fijas antes de las dinámicas:
routerView.get('/add', (req, res) => {
    bookControllerView.add(req, res);
});
routerView.get('/edit/:id', (req, res) => {
    bookControllerView.edit(req, res);
});

// Rutas dinámicas deben ir después:
routerView.get('/:id', (req, res) => {
    bookControllerView.getOne(req, res);
});
routerView.post('/update/:id', (req, res) => {
    bookControllerView.update(req, res);
});
routerView.delete('/:id', (req, res) => {
    bookControllerView.delete(req, res);
});

export {router, routerView};