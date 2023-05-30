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

moduleRouter.post('/', create);
moduleRouter.get('/:id', read);
moduleRouter.put('/:id', update);
moduleRouter.delete('/:id', del);
moduleRouter.post('/list', list);

export default moduleRouter;
