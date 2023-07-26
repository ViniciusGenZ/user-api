import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';

export const update = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const updated = await userService.update(user_id, {
			...req.body,
			updated_by: user_id,
		});
		return formatResponse(res, 200, 'OK', updated);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
