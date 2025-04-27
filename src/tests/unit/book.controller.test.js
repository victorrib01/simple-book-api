const { createBook, getAllBooks, updateBook, deleteBook } = require('../../controllers/book.controller');
const Book = require('../../models/book');

// Mock completo do modelo Book
jest.mock('../../models/Book');

describe('Book Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle error when creating a book', async () => {
    const req = { body: { title: 'Test', author: 'Author' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Creation Error');

    Book.create.mockRejectedValue(error);

    await createBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  it('should handle error when getting all books', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Fetch Error');

    Book.find.mockRejectedValue(error);

    await getAllBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  it('should handle error when updating a book', async () => {
    const req = { params: { id: '123' }, body: { title: 'Updated' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Update Error');

    Book.findByIdAndUpdate.mockRejectedValue(error);

    await updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  it('should handle error when deleting a book', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Delete Error');

    Book.findByIdAndDelete.mockRejectedValue(error);

    await deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  it('should return 404 when updating a non-existing book', async () => {
    const req = { params: { id: '123' }, body: { title: 'New Title' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    Book.findByIdAndUpdate.mockResolvedValue(null);
  
    await updateBook(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });
  
  it('should return 404 when deleting a non-existing book', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    Book.findByIdAndDelete.mockResolvedValue(null);
  
    await deleteBook(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });
  
});
