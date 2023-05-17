import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import tokenService from '@services/token';

export const validateToken = (
  req: Request,
  res: Response,
) => {
  try {
    tokenService.validateToken({
      token: req.headers.authorization as string,
    });
    return res.status(200).json(formatResponse(res, 200, 'OK', {}));
  } catch (err) {
    console.log(err)
    return defaultErrorTreatment(res, err);
  }
};
