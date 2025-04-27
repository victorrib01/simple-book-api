import errorHandler from '../../middlewares/errorHandler';

describe('Error Handler Middleware', () => {
  it('should return 500 with error message', () => {
    const err = new Error('Something broke!');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});