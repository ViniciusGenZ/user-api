import { Router } from 'express';

import { authUserMiddleware } from '@middlewares/user';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/permission/create';
import { read } from '@controllers/permission/read';
import { update } from '@controllers/permission/update';
import { del } from '@controllers/permission/delete';
import { list } from '@controllers/permission/list';
import { twoFAMiddleware } from '@middlewares/twofa';
import { ipMiddleware } from '@middlewares/ip';

const permissionRouter = Router();

permissionRouter.use(authUserMiddleware);
permissionRouter.use(sessionMiddleware);
permissionRouter.use(ipMiddleware);
permissionRouter.use(twoFAMiddleware);

permissionRouter.post('/', create);
permissionRouter.get('/:id', read);
permissionRouter.put('/:id', update);
permissionRouter.delete('/:id', del);
permissionRouter.post('/list', list);

export default permissionRouter;
