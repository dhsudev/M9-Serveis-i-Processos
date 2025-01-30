
import express from 'express';
import { getBooks, addBook } from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooks);   // GET /api/books
router.post('/', addBook);   // POST /api/books

export default router;
