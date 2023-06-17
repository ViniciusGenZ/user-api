
import { NextFunction, Request, Response } from 'express';
import tokenService from '@services/token';
import defaultErrorTreatment from '@errors/defaultErrorTreatment';

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

    req.decodedUserJwt = decodedToken;
    return next();

  } catch (err) {
    console.log(err)
    return defaultErrorTreatment(res, err);
  }
};
