import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await connect(uri);
});

beforeEach(async () => {
  const collections = await connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await connection.close();
  await mongo.stop();
});
