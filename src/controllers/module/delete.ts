import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import moduleService from '@services/module';

export const del = async (
    req: Request,
    res: Response,
) => {
    try {
        const { user_id } = req.decocedJwt
        const deleted = await moduleService.del({
            id_module: Number(req.params.id),
            by: user_id
        })
        return formatResponse(res, 200, 'OK', deleted);
    } catch (err) {
        return defaultErrorTreatment(res, err);
    }
};
