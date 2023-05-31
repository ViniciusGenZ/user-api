import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';
import bcrypt from "bcryptjs";

export const verifyEmail = async (
    req: Request,
    res: Response,
) => {
    try {
        const now = new Date();

        const { user_id } = req.decocedJwt
        const { body } = req;
        
        const user = await userService.read({ id_user: user_id }, true)

        console.log(now, user?.email_verification_code_expiration)
        if (now > (user?.email_verification_code_expiration as Date)) {
            return formatResponse(res, 404, "Verification code expired")
        }

        if (!(await bcrypt.compare(`${body.email_verification_code}`, user?.email_verification_code as string))) {
            return formatResponse(res, 401, "Code do not match");
        }

        const updated = await userService.update(
            Number(user_id),
            {
                ...req.body,
                updated_by: user_id,
                email_verification_code: null,
                email_verification_code_expiration: null,
                email_verified: true
            }
        )
        return formatResponse(res, 200, 'OK', updated);
    } catch (err) {
        return defaultErrorTreatment(res, err);
    }
};
