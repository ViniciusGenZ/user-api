
import {NextFunction, Request, Response} from 'express';

import {Err} from '../errors/customError';
import tokenService from '@services/token';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  try {
    const {authorization} = req.headers;
    const decodedJwtData = tokenService.validateToken({
      token: authorization as string,
    });

    req.decocedJwt = decodedJwtData;
    return next();
  } catch (err) {
    if (Err.isErr(err)) {
      const er = err as Err;
      return res.status(er.code).json({
        success: false,
        message: er.message,
        data: er.body,
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Error to decode jwt',
    });
  }
};
