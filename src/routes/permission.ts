import { Router } from 'express';

import { authMiddleware } from '@middlewares/jwt';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/permission/create';
import { read } from '@controllers/permission/read';
import { update } from '@controllers/permission/update';
import { del } from '@controllers/permission/delete';
import { list } from '@controllers/permission/list';

const permissionRouter = Router();

permissionRouter.use(authMiddleware);
permissionRouter.use(sessionMiddleware);

permissionRouter.get('/:id', read);
permissionRouter.post('/', create);
permissionRouter.post('/list', list);
permissionRouter.put('/:id', update);
permissionRouter.delete('/:id', del)

export default permissionRouter;
