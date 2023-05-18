export interface ITokenData {
    exp: number;
    user_id: number;
    id_session?: number;
    authorized?: boolean;
    email: string;
    name: string;
    ip: string;
    userAgent: string;
}

export interface IValidateTokenRequest {
    token: string;
}

export type IValidateTokenResponse = ITokenData
