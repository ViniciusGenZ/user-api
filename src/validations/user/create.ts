import { celebrate } from 'celebrate';
import Joi from 'joi';

export const userCreateValidation = celebrate({
	body: Joi.object().keys({
		password: Joi.string().required().min(8),
		name: Joi.string().required(),
		surname: Joi.string().required(),
		document: Joi.string().required(),
		phone_number: Joi.string().required(),
		whats: Joi.string(),
		email: Joi.string().required().email(),
		birthdate: Joi.date().required(),
		roles_id_role: Joi.number().required(),
	}),
});
