export interface ICreateJwtRequest {
    id_user: number;
    // id_session: number
}

export interface ICreateJwtResponse {
    access_token: string;
}
