/* eslint-disable @typescript-eslint/no-misused-promises */

import {Router} from 'express';

import {authMiddleware} from '@middlewares/jwt';
import {login} from '@controllers/auth/login';
import { loginValidation } from '@validations/login';
import { logout } from '@controllers/auth/logout';
import { forceLogout } from '@controllers/auth/forceLogout';
import { twoFA } from '@controllers/auth/twoFA';

const authRouter = Router();

authRouter.post('/login', loginValidation, login);
authRouter.post('/forceLogout', forceLogout);

authRouter.use(authMiddleware);

authRouter.post('/logout', logout);
authRouter.get('/twoFA', twoFA);
// authRouter.post('/logout', logout);
// authRouter.post('/twofa', twoFA);
// authRouter.get('/validateToken', validateToken);

export default authRouter;
