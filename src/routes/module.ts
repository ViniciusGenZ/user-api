import { Router } from 'express';

import { authUserMiddleware } from '@middlewares/user';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/module/create';
import { read } from '@controllers/module/read';
import { update } from '@controllers/module/update';
import { del } from '@controllers/module/delete';
import { list } from '@controllers/module/list';
import { ipMiddleware } from '@middlewares/ip';
import { twoFAMiddleware } from '@middlewares/twofa';

const moduleRouter = Router();

moduleRouter.use(authUserMiddleware);
moduleRouter.use(sessionMiddleware);
moduleRouter.use(ipMiddleware);
moduleRouter.use(twoFAMiddleware);

moduleRouter.post('/', create);
moduleRouter.get('/:id', read);
moduleRouter.put('/:id', update);
moduleRouter.delete('/:id', del);
moduleRouter.post('/list', list);

export default moduleRouter;
