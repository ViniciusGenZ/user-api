import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';

export const healthCheck = async (
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/require-await
) => {
	try {
		return formatResponse(res, 200, 'OK', {
			health: true,
		});
	} catch (err) {
		return formatResponse(res, 500, 'Server Internal Error', {
			health: false,
		});
	}
};
