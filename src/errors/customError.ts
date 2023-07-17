interface IErrBody {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string | number]: any;
}

export class Err {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isErr(err: any) {
		return err instanceof Err;
	}

	code: number;
	message: string;
	body?: IErrBody;

	constructor(code?: number, message?: string, body?: IErrBody) {
		this.code = code ?? 500;

		this.message = message ?? 'Internal Server Error';
		this.body = body;
	}
}

export type ErrorTypes = Err | Error;
