import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import roleService from '@services/role';

export const create = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const newRole = await roleService.create({
			...req.body,
			created_at: user_id,
			updated_at: user_id,
		});

		return formatResponse(res, 200, 'OK', newRole);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
