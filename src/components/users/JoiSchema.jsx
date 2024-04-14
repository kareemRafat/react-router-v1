import Joi from "joi";

const JoiSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "name can`t be empty" }),
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  address: Joi.object().keys({
    street: Joi.string().required().messages({
      "string.empty": "Street is required.",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City is required.",
    }),
  }),
  company: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": "Company name is required.",
    }),
  }),
});


export default JoiSchema;
