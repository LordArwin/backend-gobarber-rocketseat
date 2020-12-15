import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';

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
      throw new Error('Email and Password invalid!');
    }
    const pass = await compare(password, user.password);
    if (!pass) {
      throw new Error('Email and Password invalid!');
    }
    const token = sign({}, 'da4936b9c55de6ecbf06ebff0ce03ed6', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default AuthSessionService;
