import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const tokenAuth = request.headers.authorization;
  if (!tokenAuth) {
    throw new AppError('JWT is Missing');
  }
  const [, token] = tokenAuth.split(' ');
  try {
    const decoded = verify(token, config.jwt.secret);
    const { sub } = decoded as TokenPayLoad;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('JWT token invalid');
  }
}
