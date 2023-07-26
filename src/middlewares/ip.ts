import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import { NextFunction, Request, Response } from 'express';

import { Err } from '../errors/customError';

export const ipMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void | Response> => {
	try {
		if (process.env.validate_ip == 'false') return next();

		const { decodedUserJwt, ip, useragent } = req;
		if (
			decodedUserJwt.ip != ip ||
			(useragent?.source && decodedUserJwt.userAgent != useragent.source)
		)
			throw new Err(401, 'Invalid session');

		return next();
	} catch (err) {
		console.log(err);
		return defaultErrorTreatment(res, err);
	}
};
