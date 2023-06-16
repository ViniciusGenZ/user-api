import { read } from '@controllers/session/read';
import { webhookMiddleware } from '@middlewares/webhook';
import { Router } from 'express';

const sessionRouter = Router();
sessionRouter.use(webhookMiddleware);
sessionRouter.get('/:id', read);

export default sessionRouter;
