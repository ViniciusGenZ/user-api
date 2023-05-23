import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import moduleService from '@services/module';

export const update = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params
        const updated = await moduleService.update(Number(id), req.body)
        return formatResponse(res, 200, 'OK', updated);
    } catch (err) {
        return defaultErrorTreatment(res, err);
    }
};
