import { Router } from 'express';

import { create } from '@controllers/user/create';
import { userCreateValidation } from '@validations/user/create';
import { read } from '@controllers/user/read';
import { list } from '@controllers/user/list';
import { sessionMiddleware } from '@middlewares/session';
import { update } from '@controllers/user/update';
import { del } from '@controllers/user/delete';
import { verifyEmail } from '@controllers/user/emailConfirmation';
import { generateNewEmailConfirmationCode } from '@controllers/user/generateNewEmailConfirmationCode';
import { authUserMiddleware } from '@middlewares/user';
import { ipMiddleware } from '@middlewares/ip';
import { twoFAMiddleware } from '@middlewares/twofa';

const userRouter = Router();

userRouter.use(authUserMiddleware);
userRouter.use(ipMiddleware);
userRouter.use(sessionMiddleware);
userRouter.use(twoFAMiddleware);

// eslint-disable-next-line no-useless-escape
userRouter.get('/newemmailverifcationcode', generateNewEmailConfirmationCode);
userRouter.get('/:id', read);

userRouter.post('/verifyemail', verifyEmail);
userRouter.post('/list', list);
userRouter.post('/', userCreateValidation, create);

userRouter.put('/:id', update);
userRouter.delete('/:id', del);

export default userRouter;
