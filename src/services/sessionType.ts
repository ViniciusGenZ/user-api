import {
	ISessionTypeCreateRequest,
	ISessionTypeCreateResponse,
	ISessionTypeReadRequest,
} from '@interfaces/ISessionType';
import { appDataSource } from '../data-source';
import { SessionType } from '@entities/SessionType';

const repository = appDataSource.getRepository(SessionType);
const sessionTypeService = {
	repository,
	create,
	read,
};

export default sessionTypeService;

async function create(
	input: ISessionTypeCreateRequest,
): Promise<ISessionTypeCreateResponse> {
	const newSessionType = repository.create(input);
	return repository.save(newSessionType);
}

async function read({ id_session_type }: ISessionTypeReadRequest) {
	return repository.findOne({
		where: {
			id_session_type,
			status_active: true,
		},
	});
}
