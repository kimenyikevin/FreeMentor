import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/usersModels/userModels";

dotenv.config();
const Registered = {
  signup(req, res) {
    const emailexit = user.find(req.body.email);
    if (emailexit) {
      return res.status(401).send({
        status: 401,
        error: "Email already exist"
      });
    } else {
      const registeredUser = user.create(req.body);
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return res.status(201).send({
        status: 201,
        message: "User created successfully",
        data: {
          token,
          ...registeredUser 
        }
      });
    }
  },
  // user login
  signIn(req, res) {
    try {
      const logindetail = user.find(req.body.email);
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      if (
        logindetail.email === req.body.email &&
        logindetail.password == req.body.password
      ) {
        return res.status(200).send({
          status: 200,
          message: "User is successfully logged in",
          data: {
            token: token,
            ...logindetail
          }
        });
      } else {
        return res.status(401).send({
          status: 401,
          error: "Email or password is wrong"
        });
      }
    } catch (error) {
      console.log(error.message)
      return res.status(401).send({
        status: 401,
        error: "email does not exist in our data stucture"
      });
    }
  }
};

export default Registered;
