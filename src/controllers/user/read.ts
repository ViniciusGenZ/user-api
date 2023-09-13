import userService from '@services/user';
import { formatResponse } from '@adapters/formatResponse';
import { Response } from 'express';
import { IRequestExtendedWithParams } from '@interfaces/IExtendedExpress';

export const read = async (
	req: IRequestExtendedWithParams<{ id: number }>,
	res: Response,
) => {
	try {
		const user = await userService.read({ id_user: req.params.id });
		return formatResponse(res, 200, 'OK', user);
	} catch (err) {
		return formatResponse(res, 500, 'Internal Server Error');
	}
};
