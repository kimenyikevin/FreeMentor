import Joi from "@hapi/joi";
class Validation {
  uservalidation = (req, res, next) => {
    const schema = {
      firstName: Joi.string().required().regex(/^[a-zA-Z]+$/),
      lastName: Joi.string().required().regex(/^[a-zA-Z]+$/),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .max(15)
        .required().alphanum(),
      address: Joi.string().required().regex(/^[a-zA-Z]+$/),
      bio: Joi.string().required().regex(/^[a-zA-Z]+$/),
      occupation: Joi.string().required().regex(/^[a-zA-Z]+$/),
      expertise: Joi.string().required().regex(/^[a-zA-Z]+$/)
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
     return res.status(400).send({
        status: 400,
        error: result.error.details[0].message
      });
    } 
      next();
  }
}
export default new Validation();
