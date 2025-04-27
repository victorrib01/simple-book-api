import request from 'supertest';
import { listen } from '../../app';
import { connection } from 'mongoose';
import { create } from '../../models/book';

let server;

beforeAll((done) => {
  server = listen(4000, () => done());
});

afterAll(async () => {
  await server.close();
  await connection.close();
});

describe('Book API Endpoints', () => {
  it('should create a new book', async () => {
    const res = await request(server)
      .post('/api/books')
      .send({ title: 'Test Book', author: 'Tester', publishedYear: 2024 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all books', async () => {
    await create({ title: 'Another Book', author: 'Author', publishedYear: 2023 });

    const res = await request(server).get('/api/books');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a book', async () => {
    const book = await create({ title: 'Book to Update', author: 'Someone', publishedYear: 2020 });

    const res = await request(server)
      .put(`/api/books/${book._id}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Title');
  });

  it('should delete a book', async () => {
    const book = await create({ title: 'Book to Delete', author: 'Someone', publishedYear: 2020 });

    const res = await request(server)
      .delete(`/api/books/${book._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Book deleted');
  });
});