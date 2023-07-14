import { UserSession } from '@entities/UserSession';
import {
	IUserSessionCreateRequest,
	IUserSessionUpdateManyRequest,
	IUserSessionCreateResponse,
	IUserSessionReadRequest,
} from '@interfaces/IUserSession';
import { appDataSource } from '../data-source';

const repository = appDataSource.getRepository(UserSession);
const sessionService = {
	create,
	read,
	update,
};

export default sessionService;

async function create(
	input: IUserSessionCreateRequest,
): Promise<IUserSessionCreateResponse> {
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
