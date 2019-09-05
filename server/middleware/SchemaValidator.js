import Joi from "@hapi/joi";
class Validation {
  uservalidation = (req, res, next) => {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .max(10)
        .required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required()
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
