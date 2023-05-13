import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req?.user?.isAdmin) {
    throw new UnauthorizedException();
  }

  next();
}
