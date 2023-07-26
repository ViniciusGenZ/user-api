import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import roleService from '@services/role';

export const read = async (req: Request, res: Response) => {
	try {
		const role = await roleService.read({ id_role: Number(req.params.id) });
		return formatResponse(res, 200, 'OK', role);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
