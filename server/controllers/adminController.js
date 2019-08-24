import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/usersModels/userModels";
dotenv.config();

const adminSign = {
  adminLogin(req, res) {
    try {
      const logindetail = user.find(req.body.email);
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      if (
        logindetail.email === req.body.email &&
        logindetail.password == req.body.password &&
        logindetail.status == "admin"
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
      return res.status(401).send({
        status: 401,
        error: "Email or password is wrong"
      });
    }
  }
};

export default adminSign;
