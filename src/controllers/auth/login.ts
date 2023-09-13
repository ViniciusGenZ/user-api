import { Request, Response } from 'express';

import { formatResponse } from '../../adapters/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';
import sessionService from '@services/userSession';
import tokenService from '@services/token';
import mailService from '@services/mail';
import { Err } from '@errors/customError';

export const login = async (req: Request, res: Response) => {
	const { ip, useragent, body } = req;
	const expiration_date = new Date();
	expiration_date.setHours(expiration_date.getHours() + 4);

	try {
		const user = await userService.authenticate(body);
		if (!user) throw new Err(404, 'User not found');
		if (user.user_sessions.length > 0 || user.allow_multiple_sessions) {
			const session = user.user_sessions.find(
				(item) => item.user_agent === useragent?.source && item.ip === ip,
			);
			if (session) {
				if (!session.authorized) {
					const otp = await sessionService.updateSessionWithTwoFaCode(session);
					await mailService.sendOtp(
						{
							name: user.name,
							address: user.email,
						},
						otp,
					);
				}
				return formatResponse(
					res,
					200,
					'OK',
					user.loginReponse(
						tokenService.generateRespToken(
							user.id_user,
							session.id_user_session as number,
							session.authorized as boolean,
							user.email,
							user.name,
							session.ip,
							session.user_agent,
						).token,
						session,
					),
				);
			}
		}
		if (user.user_sessions.length > 0 && process.env.validate_ip != 'false') {
			const whereIsActive =
				user.user_sessions.length == 1 ? user.user_sessions[0] : null;
			throw new Err(401, `Already have an active session`, {
				ip: whereIsActive?.ip,
				useragent: whereIsActive?.user_agent,
			});
		}

		const session = await sessionService.create({
			ip,
			expiration_date,
			user_agent: useragent?.source as string,
			users_id_user: user.id_user,
			created_by: 1,
			updated_by: 1,
			session_types_id_session_type: 1,
			status_active: true,
			created_at: new Date(),
			updated_at: new Date(),
		});
		user.user_sessions.push(session);

		const otp = await sessionService.updateSessionWithTwoFaCode(session);
		await mailService.sendOtp(
			{
				name: user.name,
				address: user.email,
			},
			otp,
		);

		return formatResponse(
			res,
			200,
			'OK',
			user.loginReponse(
				tokenService.generateRespToken(
					user.id_user,
					session.id_user_session as number,
					session.authorized as boolean,
					user.email,
					user.name,
					session.ip,
					session.user_agent,
				).token,
				session,
			),
		);
	} catch (err) {
		console.log(err);
		return defaultErrorTreatment(res, err);
	}
};
