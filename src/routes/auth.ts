import {Router} from 'express';

import {authUserMiddleware} from '@middlewares/user';
import {login} from '@controllers/auth/login';
import { loginValidation } from '@validations/login';
import { logout } from '@controllers/auth/logout';
import { forceLogout } from '@controllers/auth/forceLogout';
import { twoFA } from '@controllers/auth/twoFA';
import { sessionMiddleware } from '@middlewares/session';

const authRouter = Router();

authRouter.post('/login', loginValidation, login);
authRouter.post('/forceLogout', forceLogout);

authRouter.use(authUserMiddleware);
authRouter.use(sessionMiddleware);

authRouter.get('/logout', logout);
authRouter.post('/twoFA', twoFA);

export default authRouter;
