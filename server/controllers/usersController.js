import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/usersModels/userModels";
import Joi from "@hapi/joi";
dotenv.config();
const Registered = {
  create(req, res) {
    const schema = Joi.object().keys({
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
    });
    Joi.validate(req.body, schema, (err, registeredUser) => {
      if (err) {
        return res.status(400).send({
          status: 400,
          error: "invalid data"
        });
      } else {
        const emailexit = user.find(req.body.email);
        if (emailexit) {
          return res.status(400).send({
            status: 400,
            error: "Email already exist"
          });
        } else {
          registeredUser = user.create(req.body);
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
          const { password, ...newUser } = registeredUser;
          return res.status(201).send({
            status: 201,
            message: "User created successfully",
            data: {
              token,
              ...newUser
            }
          });
        }
      }
    });
  }
};

export default Registered;
