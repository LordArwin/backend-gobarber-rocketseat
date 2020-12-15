import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

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

export default userRouter;
