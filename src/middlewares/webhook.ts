
import { NextFunction, Request, Response } from 'express';
import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import { Err } from '@errors/customError';

export const webhookMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  try {
    const { authorization } = req.headers;
    if(!authorization) throw new Err(401, 'Authorization header not found');
    if (process.env.SESSION_WEBHOOK_TOKEN != authorization.split(" ")[1]) throw new Err(401, 'Invalid authorization header');
    return next();
    
  } catch (err) {
    console.log(err)
    return defaultErrorTreatment(res, err);
  }
};
