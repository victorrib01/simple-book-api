import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import User from '../../models/user.js';

let server;

beforeAll((done) => {
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'testsecret';
  }
  server = app.listen(4001, () => done());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Auth API Endpoints', () => {
  const userData = { username: 'testuser', password: 'testpass' };

  it('should handle error on register', async () => {
    jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('DB error'));

    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(res.statusCode).toEqual(500);
    jest.restoreAllMocks();
  });

  it('should handle error on login', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('DB error'));

    const res = await request(server)
      .post('/api/v1/auth/login')
      .send(userData);

    expect(res.statusCode).toEqual(500);
    jest.restoreAllMocks();
  });

  it('should register a new user', async () => {
    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Usuário criado com sucesso');
  });

  it('should not register an existing user', async () => {
    await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Usuário já existe');
  });

  it('should login with valid credentials', async () => {
    await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    const res = await request(server)
      .post('/api/v1/auth/login')
      .send(userData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login with invalid username', async () => {
    const res = await request(server)
      .post('/api/v1/auth/login')
      .send({ username: 'wronguser', password: 'testpass' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Usuário ou senha inválidos');
  });

  it('should not login with invalid password', async () => {
    await request(server)
      .post('/api/v1/auth/register')
      .send(userData);

    const res = await request(server)
      .post('/api/v1/auth/login')
      .send({ username: 'testuser', password: 'wrongpass' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Usuário ou senha inválidos');
  });
});
