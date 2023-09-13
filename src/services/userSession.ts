import { UserSession } from '@entities/UserSession';
import {
	IUserSessionCreateRequest,
	IUserSessionUpdateManyRequest,
	IUserSessionReadRequest,
	IUserSession,
} from '@interfaces/IUserSession';
import { appDataSource } from '../data-source';
import otpGenerator from 'otp-generator';

const repository = appDataSource.getRepository(UserSession);
const sessionService = {
	create,
	read,
	update,
	updateSessionWithTwoFaCode,
};

export default sessionService;

async function create(input: IUserSessionCreateRequest) {
	const newUserSession = repository.create(input);
	return repository.save(newUserSession);
}

async function update({ filter, values }: IUserSessionUpdateManyRequest) {
	return repository.update(filter, repository.create(values));
}

async function read({ id_user_session }: IUserSessionReadRequest) {
	return repository.findOne({
		where: {
			id_user_session,
			status_active: true,
		},
	});
}
async function updateSessionWithTwoFaCode(session: IUserSession) {
	const code_expiration = new Date();
	code_expiration.setHours(code_expiration.getHours() + 1);

	const otp = otpGenerator.generate(6, {
		digits: true,
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});

	const code = otp;

	await sessionService.update({
		filter: {
			id_user_session: session.id_user_session,
		},
		values: {
			code,
			code_expiration: code_expiration,
		},
	});
	return otp;
}
