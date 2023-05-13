import { Request, Response, NextFunction } from 'express';
import { SECRET } from '../utils/constants';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = extractTokenFromHeader(req);

  if (!token) {
    throw new UnauthorizedException();
  }

  try {
    const jwtService = new JwtService({
      secret: SECRET,
    });

    const payload = await jwtService.verifyAsync(token, {
      secret: SECRET,
    });

    req['user'] = payload;
  } catch (e) {
    throw new UnauthorizedException();
  }

  next();
}

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
