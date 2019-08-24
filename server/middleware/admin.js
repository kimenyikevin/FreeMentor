import jwt from "jsonwebtoken";

const adminAuth = {
  verifyToken(req, res, next) {
    const Header = req.headers["authorization"];
    if (typeof Header !== "undefined") {
      const adminToken = Header.split(" ");
      const Token = adminToken[1];
      req.token = Token;
      jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if (err) {
          res.status(401).send({
            status: 401,
            error: "you do not have access to this service (invalid token)"
          });
        }
        {
          next();
        }
      });
    } else {
      res.status(401).send({
        status: 401,
        error: "please specify head of token"
      });
    }
  }
};
export default adminAuth;
