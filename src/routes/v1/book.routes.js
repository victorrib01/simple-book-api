import { Router } from 'express';
import { createBook, getAllBooks, updateBook, deleteBook } from '../../controllers/book.controller';

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API para gerenciar livros
 */
const router = Router();

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */
router.post('/', authMiddleware, createBook);

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Retorna todos os livros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get('/', getAllBooks);
/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 */

router.put('/:id', authMiddleware, updateBook);
/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Remove um livro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 */
router.delete('/:id', authMiddleware, deleteBook);

export default router;
