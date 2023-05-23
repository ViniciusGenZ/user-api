import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import userAgent from 'express-useragent';
import {errors} from 'celebrate'

import 'dotenv/config';
import authRouter from '../routes/auth';
import healthRouter from '../routes/health';
import userRouter from '@routes/user';
import moduleRouter from '@routes/module';
import permissionRouter from '@routes/permission';
import roleRouter from '@routes/role';

const app = express();

app.use(morgan('dev'));
app.use(cors({origin: "*"}));
app.use(userAgent.express());
app.use(express.json());

app.use('/', healthRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/module', moduleRouter);
app.use('/permission', permissionRouter);
app.use('/role', roleRouter);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(errors());

export default app;

