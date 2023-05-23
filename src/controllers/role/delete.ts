import {Request, Response} from 'express';

import {formatResponse} from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import roleService from '@services/role';

export const del = async (
  req: Request,
  res: Response,
) => {
  try {
    const {user_id} = req.decocedJwt
    const deleted = await roleService.update({
        id_role: req.body.id_role,
        status_active: false,
        updated_by: user_id
    })
    return formatResponse(res, 200, 'OK', deleted);
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
