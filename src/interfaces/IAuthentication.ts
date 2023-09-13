import { IUserCreateResponse } from './IUser';

export interface IAuthenticationRequest {
	email: string;
	password: string;
}

export interface IAuthenticationResponse {
	token: string;
	session: {
		id_user_session: number;
		authorized: boolean;
		expiration_date: Date;
	};
	user: IUserCreateResponse;
}
