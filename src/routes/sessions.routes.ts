import { Router } from 'express';
import AuthSessionService from '../services/AuthSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authService = new AuthSessionService();
    const { user, token } = await authService.execute({ email, password });
    user.password = '';
    response.json({ user, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
