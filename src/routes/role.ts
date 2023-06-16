import { Router } from 'express';

import { authUserMiddleware } from '@middlewares/user';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/role/create';
import { read } from '@controllers/role/read';
import { update } from '@controllers/role/update';
import { del } from '@controllers/role/delete';
import { list } from '@controllers/role/list';

const roleRouter = Router();

roleRouter.use(authUserMiddleware);
roleRouter.use(sessionMiddleware);

roleRouter.post('/', create);
roleRouter.get('/:id', read);
roleRouter.put('/:id', update);
roleRouter.delete('/:id', del)
roleRouter.post('/list', list);

export default roleRouter;
