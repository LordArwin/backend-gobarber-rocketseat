import { Router } from 'express';
import AuthSessionService from '../services/AuthSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authService = new AuthSessionService();
  const { user, token } = await authService.execute({ email, password });
  user.password = '';
  response.json({ user, token });
});

export default sessionsRouter;
