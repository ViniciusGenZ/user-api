import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';

export const getRolePermissions = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.decodedUserJwt;
		const rolePermissions = await userService.getUserRoleWithRelations(user_id);

		return formatResponse(res, 200, 'OK', rolePermissions);
	} catch (err) {
		return defaultErrorTreatment(res, err);
	}
};
