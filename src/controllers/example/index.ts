import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';

export const example = async (
  req: Request,
  res: Response,
// eslint-disable-next-line @typescript-eslint/require-await
) => {
  try {
    return res.status(200).json(formatResponse(200, 'OK', {}));
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
