import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import Book from '../../models/book.js';
import jwt from 'jsonwebtoken';

let server;
let token;

beforeAll((done) => {
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'testsecret'; // secret fake para ambiente de teste
  }

  server = app.listen(4000, () => {
    token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    done();
  });
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Book API Endpoints', () => {
  it('should create a new book', async () => {
    const res = await request(server)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Book', author: 'Tester', publishedYear: 2024 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all books', async () => {
    await Book.create({ title: 'Another Book', author: 'Author', publishedYear: 2023 });

    const res = await request(server)
      .get('/api/v1/books')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should update a book', async () => {
    const book = await Book.create({ title: 'Book to Update', author: 'Someone', publishedYear: 2020 });

    const res = await request(server)
      .put(`/api/v1/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Title');
  });

  it('should delete a book', async () => {
    const book = await Book.create({ title: 'Book to Delete', author: 'Someone', publishedYear: 2020 });

    const res = await request(server)
      .delete(`/api/v1/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Book deleted');
  });

  it('should return 404 if trying to update a non-existing book', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();

    const res = await request(server)
      .put(`/api/v1/books/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Should Not Work' });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Book not found');
  });

  it('should return 404 if trying to delete a non-existing book', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();

    const res = await request(server)
      .delete(`/api/v1/books/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Book not found');
  });
});
