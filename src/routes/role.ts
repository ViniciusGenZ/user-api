import { Router } from 'express';

import { authUserMiddleware } from '@middlewares/user';
import { sessionMiddleware } from '@middlewares/session';
import { create } from '@controllers/role/create';
import { read } from '@controllers/role/read';
import { update } from '@controllers/role/update';
import { del } from '@controllers/role/delete';
import { list } from '@controllers/role/list';
import { ipMiddleware } from '@middlewares/ip';
import { twoFAMiddleware } from '@middlewares/twofa';

const roleRouter = Router();

roleRouter.use(authUserMiddleware);
roleRouter.use(sessionMiddleware);
roleRouter.use(ipMiddleware);
roleRouter.use(twoFAMiddleware);

roleRouter.post('/list', list);
roleRouter.post('/', create);
roleRouter.get('/:id', read);
roleRouter.put('/:id', update);
roleRouter.delete('/:id', del);

export default roleRouter;
