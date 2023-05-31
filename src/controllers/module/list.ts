import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import moduleService from '@services/module';

export const list = async (
  req: Request,
  res: Response,
) => {
  try {
    const { filter } = req.body;

    const limit = Number(req.body.limit ?? 10);
    const offset = Number(req.body.page ?? 0) * limit;

    const modules = await moduleService.list({ limit, offset, filter });

    return formatResponse(res, 200, "OK", modules);
  } catch (err) {
    console.log(err)
    return defaultErrorTreatment(res, err);
  }
};
