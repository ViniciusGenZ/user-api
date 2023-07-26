import { NextFunction, Request, Response } from 'express';
import { Err } from '../errors/customError';
import defaultErrorTreatment from '@errors/defaultErrorTreatment';

export const twoFAMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void | Response => {
	try {
		if (process.env.validate_twofa == 'false') return next();

		const { decodedUserJwt } = req;
		if (decodedUserJwt && !decodedUserJwt.authorized)
			throw new Err(403, 'Two factor authentication not authorized');

		return next();
	} catch (err) {
		console.log(err);
		return defaultErrorTreatment(res, err);
	}
};
