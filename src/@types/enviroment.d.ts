declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_PORT: string;
			DATABASE_URL: string;
			DATABASE_USER: string;
			DATABASE_PASSWORD: string;
			DATABASE: string;
			PORT: string;
			ENV: 'test' | 'dev' | 'prod';
			jwtSecret: string;
			AWS_ACCESS_KEY_ID: string;
			AWS_SECRET_ACCESS_KEY: string;
			SES_EMAIL: string;
			SES_NAME: string;
			validate_ip: boolean;
			validate_twofa: boolean;
			validate_session: boolean;
		}
	}
}
