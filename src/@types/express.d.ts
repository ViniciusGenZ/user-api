import { IUserToken } from '@interfaces/IUserToken';

declare global {
	namespace Express {
		export interface Request {
			decodedUserJwt: IUserToken;
		}
	}
}
