import { Request, Response } from 'express';

import { formatResponse } from '@adapters/formatResponse';
import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import sessionService from '@services/userSession';
import userService from '@services/user';

export const forceLogout = async (req: Request, res: Response) => {
	try {
		const user = await userService.authenticate(req.body);
		if (!user) return formatResponse(res, 404, 'User not found');

		await sessionService.update({
			filter: {
				users_id_user: user.id_user,
				status_active: true,
			},
			values: {
				status_active: false,
			},
		});

		return formatResponse(res, 200, 'Session logout success', {});
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
