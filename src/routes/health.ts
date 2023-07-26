import { Router } from 'express';

import { healthCheck } from '@controllers/healthCheck';

const healthRouter = Router();

healthRouter.get('/', healthCheck);
healthRouter.get('/healthCheck', healthCheck);

export default healthRouter;
