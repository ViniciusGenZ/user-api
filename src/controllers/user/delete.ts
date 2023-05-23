import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';

export const del = async (
    req: Request,
    res: Response,
) => {
    try {
        const { user_id } = req.decocedJwt
        const deleted = await userService.del({
            id_user: Number(req.params.id),
            updated_by: user_id,
            updated_at: new Date(),
            deleted_by: user_id,
            deleted_at: new Date(),
        })
        return formatResponse(res, 200, 'OK', deleted);
    } catch (err) {
        return defaultErrorTreatment(res, err);
    }
};
