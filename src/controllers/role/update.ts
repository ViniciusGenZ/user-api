import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import roleService from '@services/role';

export const update = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const { id } = req.params;
		const updatedRole = await roleService.update(Number(id), {
			...req.body,
			updated_by: user_id,
		});
		return formatResponse(res, 200, 'OK', updatedRole);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
