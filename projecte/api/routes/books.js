import express from 'express';
import BookController from '../controllers/booksController.js';

const router = express.Router();
const bookController = new BookController();

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

export default router;