import { Request } from 'express';

import { Query, ParamsDictionary } from 'express-serve-static-core';

export type IRequestExtendedWithBody<T> = Omit<Request, 'body'> & {
	body: T;
};

export type IRequestExtendedWithQuery<T> = Omit<Request, 'query'> & {
	query: Query & T;
};

export type IRequestExtendedWithParams<T> = Omit<Request, 'params'> & {
	params: ParamsDictionary & T;
};

export type IRequestExtendedWithBodyAndParams<B, P> = Omit<
	Request,
	'body' | 'params'
> & {
	body: B;
	params: ParamsDictionary & P;
};
