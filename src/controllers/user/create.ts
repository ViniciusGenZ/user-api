import mailService from '@services/mail';
import optService from '@services/otp';
import roleService from '@services/role';
import userService from '@services/user';
import { formatResponse } from '@adapters/formatResponse';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
	try {
		// const { user_id } = req.decodedUserJwt || 0;

		const code_expiration = new Date();
		code_expiration.setHours(code_expiration.getHours() + 1);
		const phone_number_verification_code = optService.generateOTP();
		const email_verification_code = optService.generateOTP();

		const role = await roleService.list({
			offset: 0,
			limit: 1,
			filter: {
				name_en: 'Admin',
			},
		});

		const newUser = await userService.create({
			...req.body,
			created_by: 1,
			updated_by: 1,
			email_verification_code,
			email_verification_code_expiration: code_expiration,
			phone_number_verification_code,
			phone_number_verification_code_expiration: code_expiration,
			roles_id_role: role.rows[0].id_role,
		});

		await mailService.sendMailConfirmation(
			{ address: newUser.email, name: newUser.name },
			email_verification_code,
		);
		//add send phone number verification

		return formatResponse(res, 200, 'OK', newUser);
	} catch (err) {
		console.log(err);
		return formatResponse(res, 500, 'Internal Server Error');
	}
};
