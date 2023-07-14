import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';

export const del = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const deleted = await userService.del({
			id_user: Number(req.params.id),
			by: user_id,
		});
		return formatResponse(res, 200, 'OK', deleted);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
