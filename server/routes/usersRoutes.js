import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validate from "../middleware/SchemaValidator";
import User from "../controllers/usersController";
import changeUser from "../controllers/changeUSer";
import verify from "../middleware/admin";
dotenv.config();
const { signup, signIn } = User;
const router = express.Router();
router.post("/signup", validate.uservalidation, signup);
router.post("/signin", signIn);
router.patch("/user/:id", verify.verifyToken, changeUser.changeStatus);

//Admin login information
router.post("/user/admin", (req, res) => {
  const user = {
    id: 1,
    email: "admin@gmail.com",
    password: "admin"
  };
  jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

export default router;
