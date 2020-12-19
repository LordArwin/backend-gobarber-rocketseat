import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  username: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ email, password, username }: Request): Promise<User> {
    const userRepo = getRepository(User);
    const checkEmail = await userRepo.findOne({ where: { email } });
    if (checkEmail) {
      throw new AppError('E-mail already registered');
    }
    const hashPass = await hash(password, 8);
    const user = userRepo.create({ username, email, password: hashPass });
    await userRepo.save(user);
    return user;
  }
}

export default CreateUserService;
