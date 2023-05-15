import { celebrate } from "celebrate";
import Joi from "joi";

export const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .min(8),
    email: Joi.string().required().email(),
  }),
});
