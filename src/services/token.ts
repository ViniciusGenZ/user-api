import { Err } from '@errors/customError';
import { IUserToken, IValidateTokenRequest } from '@interfaces/IUserToken';
import jwt from 'jsonwebtoken';

const tokenService = {
	createToken,
	generateRespToken,
	validateUserToken,
};

export default tokenService;

function createToken(data: IUserToken): string {
	const access_token = jwt.sign(data, process.env.jwtSecret as string);
	return access_token;
}

function generateRespToken(
	user_id: number,
	id_session: number,
	authorized: boolean,
	email: string,
	name: string,
	ip: string,
	userAgent: string,
) {
	try {
		// 60 seconds * 60 minutes * 24 horas
		const day = 60 * 60 * 24;
		const exp: number = Math.floor(Date.now() / 1000) + day;
		const token = createToken({
			exp,
			authorized,
			user_id,
			id_session,
			email,
			name,
			ip,
			userAgent,
		});

		const resp = {
			token,
		};
		return resp;
	} catch {
		throw new Err(401, 'Error to generate jwt');
	}
}

function validateUserToken(data: IValidateTokenRequest): IUserToken {
	try {
		const { token } = data;
		if (!token) throw new Err(401, 'Authorization not found');

		const auth = token.split(' ');
		if (auth[0] !== 'Bearer' || auth[1] === '' || !auth[1])
			throw new Err(401, 'Malformed authorization header');

		const decoded = jwt.verify(auth[1], process.env.jwtSecret as string);
		if (!decoded) throw new Err(401, 'Authorization invalid');

		return decoded as IUserToken;
	} catch (err) {
		if (Err.isErr(err)) throw err;
		console.log(err);
		throw new Err(401, 'Error to validate token');
	}
}
