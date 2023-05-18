/* eslint-disable @typescript-eslint/no-misused-promises */

import {Router} from 'express';

import {authMiddleware} from '@middlewares/jwt';
import {login} from '@controllers/auth/login';
import { loginValidation } from '@validations/login';
import { logout } from '@controllers/auth/logout';
import { forceLogout } from '@controllers/auth/forceLogout';
import { twoFA } from '@controllers/auth/twoFA';
import { sessionMiddleware } from '@middlewares/session';

const authRouter = Router();

authRouter.post('/login', loginValidation, login);
authRouter.post('/forceLogout', forceLogout);

authRouter.use(authMiddleware);
authRouter.use(sessionMiddleware);

authRouter.get('/logout', logout);
authRouter.post('/twoFA', twoFA);
authRouter.post('/logout', logout);

export default authRouter;
