import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isAdmin } from './isAdmin';

describe('isAdmin middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('should call next if user is admin', async () => {
    req.user = {
      isAdmin: true,
      name: 'test',
      email: 'test@test.com',
      id: 'some-id',
    };

    await isAdmin(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it('should throw UnauthorizedException if user is not admin', async () => {
    req.user = req.user = {
      isAdmin: false,
      name: 'test',
      email: 'test@test.com',
      id: 'some-id',
    };

    await expect(isAdmin(req, res, next)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
