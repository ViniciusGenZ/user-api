import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import roleService from '@services/role';

export const del = async (
    req: Request,
    res: Response,
) => {
    try {
        const { user_id } = req.decodedUserJwt
        const deleted = await roleService.del({
            id_role: Number(req.params.id),
            by: user_id
        })
        return formatResponse(res, 200, 'OK', deleted);
    } catch (err) {
        return defaultErrorTreatment(res, err);
    }
};
