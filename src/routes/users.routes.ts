import { Router } from 'express';
import multer from 'multer';
import ensureAuth from '../middlewares/ensureAuth';
import CreateUserService from '../services/CreateUserService';
import UploadConfig from '../config/upload';
import UploadAvatarImg from '../services/UploadAvatarImg';

const userRouter = Router();

const upload = multer(UploadConfig);

userRouter.post('/', async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const userCreateService = new CreateUserService();
    const userCreated = await userCreateService.execute({
      username,
      password,
      email,
    });
    userCreated.password = '';
    response.status(200).json({ userCreated });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    const uploadAvatarImgService = new UploadAvatarImg();
    const user = await uploadAvatarImgService.execute({
      file_name: request.file.filename,
      user_id: request.user.id,
    });
    user.password = '';
    return response.json(user);
  },
);

export default userRouter;
