// import { create, find, countDocuments, findByIdAndUpdate, findByIdAndDelete } from '../models/book';
import Book from '../models/book.js';

// Criar novo livro
export async function createBook(req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

// Buscar todos os livros com paginação e filtros
export async function getAllBooks(req, res, next) {
  try {
    const { page = 1, limit = 10, title, author } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Filtro por título, insensível a maiúsculas
    }

    if (author) {
      query.author = { $regex: author, $options: 'i' }; // Filtro por autor, insensível a maiúsculas
    }

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    next(error);
  }
}

// Atualizar livro
export async function updateBook(req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

// Deletar livro
export async function deleteBook(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    next(error);
  }
}
