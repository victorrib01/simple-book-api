import authMiddleware from '../../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';

describe('Auth Middleware', () => {
  let verifySpy;

  afterEach(() => {
    if (verifySpy) {
      verifySpy.mockRestore(); // restaurar o comportamento original
    }
  });

  it('should return 401 if token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    verifySpy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
  });

  it('should call next if token is valid', () => {
    const req = { headers: { authorization: 'Bearer validtoken' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // <-- aqui agora igual ao outro teste
    const next = jest.fn();
  
    verifySpy = jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123' });
  
    authMiddleware(req, res, next);
  
    expect(req.user).toEqual({ id: 'user123' });
    expect(next).toHaveBeenCalled();
  });
  
});
