
import { NextFunction, Request, Response } from 'express';

import { Err } from '../errors/customError';

export const twoFAMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response => {
    try {
        const { decodedUserJwt } = req;
        if (decodedUserJwt && !decodedUserJwt.authorized) throw new Err(403, 'Two factor authentication not authorized');

        return next();
    } catch (err) {

        console.log("error in twofa")
        console.log(err)
        
        if (Err.isErr(err)) {
            const er = err as Err;
            return res.status(er.code).json({
                success: false,
                message: er.message,
                data: er.body,
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Error to validate user',
        });
    }
};
