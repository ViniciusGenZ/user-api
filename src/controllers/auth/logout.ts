import { Request, Response } from 'express';

import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import { formatResponse } from '@adapters/formatResponse';
import sessionService from '@services/userSession';

export const logout = async (req: Request, res: Response) => {
	try {
		const { user_id, id_session } = req.decodedUserJwt;
		await sessionService.update({
			filter: {
				users_id_user: user_id,
				id_user_session: id_session,
				status_active: true,
			},
			values: {
				status_active: false,
			},
		});

		return formatResponse(res, 200, 'Session logged out with success');
	} catch (err) {
		console.log(err);
		return defaultErrorTreatment(res, err);
	}
};
