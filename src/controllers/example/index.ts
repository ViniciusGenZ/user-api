import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';

export const example = async (
  req: Request,
  res: Response,
) => {
  try {
    return formatResponse(res, 200, 'OK', {});
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
