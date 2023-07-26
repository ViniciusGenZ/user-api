import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import sessionService from '@services/userSession';

export const read = async (req: Request, res: Response) => {
	try {
		const session = await sessionService.read({
			id_user_session: Number(req.params.id),
		});
		return formatResponse(res, 200, 'OK', session);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
