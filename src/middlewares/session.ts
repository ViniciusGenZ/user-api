
import defaultErrorTreatment from '@errors/defaultErrorTreatment';
import sessionService from '@services/userSession';
import { NextFunction, Request, Response } from 'express';

import { Err } from '../errors/customError';

export const sessionMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    try {
        const { decocedJwt, ip, useragent } = req;
        if (decocedJwt.ip != ip || (useragent?.source && decocedJwt.userAgent != useragent.source)) throw new Err(401, 'Invalid session')

        const session = await sessionService.read({id_user_session: decocedJwt.id_session as number})
        if(!session)throw new Err(401, 'Invalid session')
        return next();
    } catch (err) {
        console.log("error in session middleware")
        console.log(err)
        return defaultErrorTreatment(res, err);
    }
};
