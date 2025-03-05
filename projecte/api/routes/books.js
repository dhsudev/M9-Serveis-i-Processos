
import express from 'express';
import { getBooks, addBook, getBookById, updateBook, deleteBook } from '../controllers/booksController.js';

const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.id) {
        getBookById(req, res);
    } else {
        getBooks(req, res);
    }
});
router.post('/', addBook);  
router.put('/:id', updateBook); 
router.delete('/:id', deleteBook);  

export default router;
