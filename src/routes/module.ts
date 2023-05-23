import { Router } from 'express';

import { authMiddleware } from '@middlewares/jwt';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/module/create';
import { read } from '@controllers/module/read';
import { update } from '@controllers/module/update';
import { del } from '@controllers/module/delete';
import { list } from '@controllers/module/list';

const moduleRouter = Router();

moduleRouter.use(authMiddleware);
moduleRouter.use(sessionMiddleware);

moduleRouter.get('/:id', read);
moduleRouter.post('/', create);
moduleRouter.post('/list', list);
moduleRouter.put('/:id', update);
moduleRouter.delete('/:id', del)

export default moduleRouter;
