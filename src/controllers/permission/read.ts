import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import permissionService from '@services/permission';

export const read = async (req: Request, res: Response) => {
	try {
		const permission = await permissionService.read({
			id_permission: Number(req.params.id),
		});
		return formatResponse(res, 200, 'OK', permission);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
