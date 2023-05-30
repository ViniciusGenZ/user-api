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

roleRouter.post('/', create);
roleRouter.get('/:id', read);
roleRouter.put('/:id', update);
roleRouter.delete('/:id', del)
roleRouter.post('/list', list);

export default roleRouter;
