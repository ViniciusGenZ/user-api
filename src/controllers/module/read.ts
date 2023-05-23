import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import moduleService from '@services/module';

export const read = async (
  req: Request,
  res: Response,
) => {
  try {
    const module = await moduleService.read({id_module: Number(req.params.id)})
    return formatResponse(res, 200, 'OK', module);
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
