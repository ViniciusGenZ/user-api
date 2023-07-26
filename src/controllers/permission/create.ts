import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import permissionService from '@services/permission';

export const create = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const created = await permissionService.create({
			...req.body,
			created_at: user_id,
			updated_at: user_id,
		});

		return formatResponse(res, 200, 'OK', created);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
