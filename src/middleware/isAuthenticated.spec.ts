import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { isAuthenticated } from './isAuthenticated';
import { SECRET } from '../utils/constants';

describe('isAuthenticated middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if token is provided and valid', async () => {
    const token = 'valid-token';
    req.headers = { authorization: `Bearer ${token}` };

    const payload = { userId: 123 };
    const verifyAsyncMock = jest.fn().mockResolvedValue(payload);
    JwtService.prototype.verifyAsync = verifyAsyncMock;

    await isAuthenticated(req, res, next);
  });

  it('should throw UnauthorizedException if token is not provided', async () => {
    req.headers = {};

    await expect(isAuthenticated(req, res, next)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(next).not.toBeCalled();
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const token = '';
    req.headers = { authorization: `Bearer ${token}` };

    try {
      await isAuthenticated(req, res, next);
    } catch (err) {
      expect(err.name).toBe('UnauthorizedException');
    }

    expect(next).not.toBeCalled();
  });

  it('should call next() if token is valid', async () => {
    const jwtService = new JwtService({
      secret: SECRET,
    });

    const payload = {
      sub: 'some-id',
      email: 'some-email@test.com',
    };

    const token = await jwtService.signAsync(payload);

    req.headers = { authorization: `Bearer ${token}` };

    await isAuthenticated(req, res, next);

    expect(next).toBeCalled();
  });
});
