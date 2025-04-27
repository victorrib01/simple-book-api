import { createBook, getAllBooks, updateBook, deleteBook } from '../../controllers/book.controller.js';
import Book from '../../models/book.js';

describe('Book Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // limpa tudo depois de cada teste
  });

  it('should handle error when creating a book', async () => {
    const req = { body: { title: 'Test', author: 'Author' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    const error = new Error('Creation Error');

    jest.spyOn(Book, 'create').mockRejectedValue(error);

    await createBook(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should handle error when getting all books', async () => {
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    
    const error = new Error('Fetch Error');
    jest.spyOn(Book, 'find').mockImplementation(() => {
      throw error;
    });

    await getAllBooks(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should handle error when updating a book', async () => {
    const req = { params: { id: '123' }, body: { title: 'Updated' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    const error = new Error('Update Error');

    jest.spyOn(Book, 'findByIdAndUpdate').mockRejectedValue(error);

    await updateBook(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should handle error when deleting a book', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    const error = new Error('Delete Error');

    jest.spyOn(Book, 'findByIdAndDelete').mockRejectedValue(error);

    await deleteBook(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
