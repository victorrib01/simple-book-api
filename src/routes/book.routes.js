const express = require('express');
const { createBook, getAllBooks, updateBook, deleteBook } = require('../controllers/book.controller');

const router = express.Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
