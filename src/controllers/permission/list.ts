import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import permissionService from '@services/permission';

export const list = async (
  req: Request,
  res: Response,
) => {
  try {
    const { filter } = req.body

    const limit = Number(req.body.limit ?? 10);
    const offset = Number(req.body.page ?? 0) * limit;

    const permissions = await permissionService.list({ limit, offset, filter })
    return formatResponse(res, 200, "OK", permissions);
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
