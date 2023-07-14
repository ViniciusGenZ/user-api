import { User } from '@entities/User';
import { IAuthenticationRequest } from '@interfaces/IAuthentication';
import {
	IUser,
	IUserCreateRequest,
	IUserCreateResponse,
	IUserDeleteRequest,
	IUserListRequest,
	IUserListResponse,
	IUserReadRequest,
	IUserUpdateRequest,
	IUserUpdateResponse,
} from '@interfaces/IUser';
import { appDataSource } from '../data-source';
import bcrypt from 'bcryptjs';
import { UserSession } from '@entities/UserSession';

// TODO user delete should logout all sessions

const repository = appDataSource.getRepository(User);
const sessionsRepository = appDataSource.getRepository(UserSession);

const userService = {
	repository,
	create,
	read,
	update,
	del,
	list,
	authenticate,
};

export default userService;

async function list(
	input: IUserListRequest,
	all?: boolean,
): Promise<IUserListResponse> {
	const [rows, count] = await repository.findAndCount({
		skip: input.offset,
		take: input.limit,
		where: input.filter,
		select: {
			id_user: true,
			email: true,
			name: true,
			surname: true,
			document: true,
			phone_number: true,
			whats: true,
			birthdate: true,
			allow_multiple_sessions: true,
			email_verified: true,
			phone_number_verified: true,
			user_sessions: true,
			login_attempts: true,
			ban_expiration: true,
			banned: true,
			email_verification_code_expiration: true,
			phone_number_verification_code_expiration: true,
			status_active: true,
			created_at: true,
			updated_at: true,
			deleted_at: true,
			created_by: true,
			updated_by: true,
			deleted_by: true,
			password: all ? true : false,
			email_verification_code: all ? true : false,
			phone_number_verification_code: all ? true : false,
		},
	});

	return { count, rows };
}

async function create(input: IUserCreateRequest): Promise<IUserCreateResponse> {
	const newUser = userService.repository.create({
		...input,
		created_at: new Date(),
		updated_at: new Date(),
	});
	return repository.save(newUser);
}

async function read(
	input: IUserReadRequest,
	all?: boolean,
): Promise<IUserCreateResponse | null> {
	console.log({
		id_user: input.id_user,
		status_active: true,
	});
	const user = await repository.findOne({
		where: {
			id_user: input.id_user,
			status_active: true,
		},
		select: {
			id_user: true,
			email: true,
			name: true,
			surname: true,
			document: true,
			phone_number: true,
			whats: true,
			birthdate: true,
			allow_multiple_sessions: true,
			email_verified: true,
			phone_number_verified: true,
			user_sessions: true,
			login_attempts: true,
			ban_expiration: true,
			banned: true,
			email_verification_code_expiration: true,
			phone_number_verification_code_expiration: true,
			status_active: true,
			created_at: true,
			updated_at: true,
			deleted_at: true,
			created_by: true,
			updated_by: true,
			deleted_by: true,
			password: all ? true : false,
			email_verification_code: all ? true : false,
			phone_number_verification_code: all ? true : false,
		},
	});
	if (!user) return null;

	const sessions = await sessionsRepository.find({
		where: {
			users_id_user: user.id_user,
			status_active: true,
		},
		order: {
			id_user_session: 'DESC',
		},
	});
	user.user_sessions = sessions;

	return user;
}

async function update(
	id_user: number,
	input: IUserUpdateRequest,
): Promise<IUserUpdateResponse> {
	const toUpdate = userService.repository.create({
		...input,
		updated_at: new Date(),
	});
	return (await repository.update({ id_user }, toUpdate)).raw[0];
}

async function del({ id_user, by }: IUserDeleteRequest) {
	console.log(id_user, by);
	const user = repository.create({
		status_active: false,
		deleted_at: new Date(),
		updated_by: by,
		deleted_by: by,
	});
	return (await repository.update({ id_user }, user)).raw[0];
}

async function authenticate({
	email,
	password,
}: IAuthenticationRequest): Promise<IUser | null> {
	const user = await repository.findOne({
		where: {
			email,
			status_active: true,
		},
	});
	if (!user) return null;

	if (await bcrypt.compare(password, user.password)) {
		const sessions = await sessionsRepository.find({
			where: {
				status_active: true,
				users_id_user: user.id_user,
			},
			order: {
				id_user_session: 'DESC',
			},
		});
		user.user_sessions = sessions;

		user.password = '';
		user.email_verification_code = '';
		user.phone_number_verification_code = '';

		await repository.update(
			{
				id_user: user.id_user,
			},
			repository.create({
				login_attempts: 0,
				banned: false,
			}),
		);

		return user;
	} else {
		const values: IUserUpdateRequest = {
			login_attempts: user.login_attempts + 1,
			updated_by: user.id_user,
			updated_at: new Date(),
		};

		if (user.login_attempts > 2) {
			const ban_expiration = new Date();
			ban_expiration.setMinutes(ban_expiration.getMinutes() + 15);
			values.ban_expiration = ban_expiration;
			values.banned = true;
		}

		await repository.update(
			{
				id_user: user.id_user,
			},
			values,
		);

		throw new Error('Password do not match');
	}
}
