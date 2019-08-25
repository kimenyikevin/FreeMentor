import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/usersModels/userModels";

dotenv.config();
const Registered = {
  signup(req, res) {
    const emailexit = userModel.findByEmail(req.body.email);
    if (emailexit) {
      return res.status(401).send({
        status: 401,
        error: "Email already exist"
      });
    } else {
      const registeredUser = userModel.create(req.body);
      const token = jwt.sign(
        { id: registeredUser.id},
        process.env.SECRET_KEY
      );
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
  },
  // user login
  signIn(req, res) {
    const { email, password } = req.body;
    const user = userModel.findByEmail(email);
    if (!user) {
      return res.status(404).send({
        status: 404,
        error: "email does not exist"
      });
    }
    const token = jwt.sign(
      { id: user.id, userType: user.status },
      process.env.SECRET_KEY
    );
    if (user.email === email && user.password == password) {
      const { password, ...newUser } = user;
      return res.status(200).send({
        status: 200,
        message: "User is successfully logged in",
        data: {
          token: token,
          ...newUser
        }
      });
    } else {
      return res.status(401).send({
        status: 401,
        error: "Email or password is wrong"
      });
    }
  }
};

export default Registered;
