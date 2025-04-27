import { Error } from 'mongoose';
import Book from '../../models/book';

describe('Book Model Test', () => {
  it('should create & save a book successfully', async () => {
    const bookData = { title: 'Unit Book', author: 'Tester', publishedYear: 2025 };
    const validBook = new Book(bookData);
    const savedBook = await validBook.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.author).toBe(bookData.author);
    expect(savedBook.publishedYear).toBe(bookData.publishedYear);
  });

  it('should fail without required fields', async () => {
    const bookWithoutRequiredField = new Book({ author: 'Tester' });
    let err;
    try {
      await bookWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});