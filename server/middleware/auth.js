import jwt from "jsonwebtoken";
import userModel from "../models/usersModels/userModels";
const adminAuth = {
  verifyAdmin(req, res, next) {
    const { status } = req.currentUser;
    if (status !== "admin") {
      return res.status(401).send({
        status: 401,
        error: "you are not an admin"
      });
    }
    next();
  },
  verifyMentor(req, res, next) {
    const { status } = req.currentUser;
    if (status !== "mentor") {
      return res.status(401).send({
        status: 401,
        error: "you are not authorized"
      });
    }
    next();
  },
  verifyUser(req, res, next) {
    const { status } = req.currentUser;
    if (status !== "user") {
      return res.status(401).send({
        status: 401,
        error: "you are not authorized"
      });
    }
    next();
  },
  verifyToken(req, res, next) {
    try {
      const Header = req.headers["authorization"];
      if (typeof Header !== "undefined") {
        const adminToken = Header.split(" ");
        const Token = adminToken[1];
        req.token = Token;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, { id }) => {
          if (err) {
            return res.status(401).send({
              status: 401,
              error: "you do not have access to this service (invalid token)"
            });
          }
          const user = userModel.findById(id);
          if (!user) {
            return res.status(404).send({
              status: 404,
              error: "user not found"
            });
          }
          req.currentUser = user;
          next();
        });
      } else {
        return res.status(401).send({
          status: 401,
          error: "please specify head of token"
        });
      }
    } catch (error) {
      return res.status(404).send({
        status: 404,
        error: "you do not have access to this service"
      });
    }
  }
};
export default adminAuth;
