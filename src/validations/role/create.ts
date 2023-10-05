import { celebrate } from 'celebrate';
import Joi from 'joi';

export const roleCreateValidation = celebrate({
	body: Joi.object().keys({
		name_py: Joi.string().required(),
		name_en: Joi.string().required(),
		name_br: Joi.string().required(),
	}),
});
