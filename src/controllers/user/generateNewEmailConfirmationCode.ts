import { Request, Response } from 'express';

import { formatResponse } from '../../utils/formatResponse';
import defaultErrorTreatment from '../../errors/defaultErrorTreatment';
import userService from '@services/user';
import optService from '@services/otp';
import mailService from '@services/mail';

export const generateNewEmailConfirmationCode = async (
    req: Request,
    res: Response,
) => {
    try {
        const code_expiration = new Date();
        code_expiration.setHours(code_expiration.getHours() + 1);
        const { user_id } = req.decocedJwt
        const user = await userService.read({ id_user: user_id }, true)
        
        if(user?.email_verified) return formatResponse(res, 404, "User email already verified")

        const email_verification_code = optService.generateOTP();
        
        const updated = await userService.update(
            Number(user_id),
            {
                updated_by: user_id,
                email_verification_code: email_verification_code,
                email_verification_code_expiration: code_expiration,
            }
        )

        await mailService.sendMailConfirmation({address: (user?.email as string), name: (user?.name as string)}, email_verification_code);

        return formatResponse(res, 200, 'OK', updated);
    } catch (err) {
        console.log("error in generateNewEmailConfirmationCode in user controller ")
        console.log(err)
        return defaultErrorTreatment(res, err);
    }
};
