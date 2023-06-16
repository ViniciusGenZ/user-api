
import { NextFunction, Request, Response } from 'express';

import { Err } from '../errors/customError';
import tokenService from '@services/token';

export const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  try {
    const { authorization } = req.headers;
    const decodedToken = tokenService.validateUserToken({
      token: authorization as string,
    });
    console.log("aqui")
    req.decodedUserJwt = decodedToken;
    return next();

  } catch (err) {

    console.log("error in user jwt decode")
    console.log(err)
    
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
