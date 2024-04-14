import Joi from "joi";

const JoiSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required().messages({
      "string.empty": "Email is required.",
      "string.email" : "Email must be a valid email"
    }),
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
