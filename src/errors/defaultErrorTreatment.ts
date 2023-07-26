import { Response } from 'express';

import { formatResponse } from '@adapters/formatResponse';
import { Err } from './customError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultErrorTreatment(res: Response, err: any | Err) {
	if (Err.isErr(err)) return formatResponse(res, err.code, err.message);
	return formatResponse(res, 500, 'Internal Server Error', err);
}

export default defaultErrorTreatment;
