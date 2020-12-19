import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import config from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepo = getRepository(User);
    const user = await usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Email and Password invalid!', 401);
    }
    const pass = await compare(password, user.password);
    if (!pass) {
      throw new AppError('Email and Password invalid!', 401);
    }
    const { secret, expiresIn } = config.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthSessionService;
