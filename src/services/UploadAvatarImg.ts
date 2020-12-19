import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '../models/User';
import UploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  file_name: string;
}
class UploadAvatarImg {
  public async execute({ user_id, file_name }: Request): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(user_id);
    if (!user) {
      throw new AppError('Only Auth User Can Change Avatar', 401);
    }
    if (user.avatar) {
      const joinPath = path.join(UploadConfig.filepath, user.avatar);
      const fileExists = await fs.existsSync(joinPath);
      if (fileExists) {
        await fs.promises.unlink(joinPath);
      }
    }
    user.avatar = file_name;
    userRepo.save(user);
    return user;
  }
}
export default UploadAvatarImg;
