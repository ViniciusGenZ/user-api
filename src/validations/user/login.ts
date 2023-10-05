import { celebrate } from 'celebrate';
import Joi from 'joi';

export const loginValidation = celebrate({
	body: Joi.object().keys({
		password: Joi.string().required().min(8),
		email: Joi.string().required().email(),
	}),
});
