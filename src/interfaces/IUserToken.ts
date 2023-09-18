export interface IUserToken {
	exp: number;
	user_id: number;
	email: string;
	name: string;
	ip: string;
	userAgent: string;
	authorized: boolean;
	id_session: number;
	role_id: number;
}

export interface IValidateTokenRequest {
	token: string;
}

export type IValidateTokenResponse = IUserToken;
