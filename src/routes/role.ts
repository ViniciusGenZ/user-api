import { Router } from 'express';

import { authMiddleware } from '@middlewares/jwt';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/role/create';
import { read } from '@controllers/role/read';
import { update } from '@controllers/role/update';
import { del } from '@controllers/role/delete';
import { list } from '@controllers/role/list';

const roleRouter = Router();

roleRouter.use(authMiddleware);
roleRouter.use(sessionMiddleware);

roleRouter.get('/:id', read);
roleRouter.post('/', create);
roleRouter.post('/list', list);
roleRouter.put('/:id', update);
roleRouter.delete('/:id', del)

export default roleRouter;
