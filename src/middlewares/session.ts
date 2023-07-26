import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import sessionService from '@services/userSession';
import { NextFunction, Request, Response } from 'express';

import { Err } from '../errors/customError';

export const sessionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void | Response> => {
	try {
		if (process.env.validate_session == 'false') return next();

		const session = await sessionService.read({
			id_user_session: req.decodedUserJwt.id_session as number,
		});
		if (!session) throw new Err(401, 'Invalid session');

		return next();
	} catch (err) {
		console.log(err);
		return defaultErrorTreatment(res, err);
	}
};
