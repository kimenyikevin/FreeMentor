import express from "express";
import validate from "../middleware/SchemaValidator";
import User from "../controllers/usersController";
import changeUser from "../controllers/changeUSer";
import verify from "../middleware/admin";
import adminSignin from "../controllers/adminController";
import mentors from "../controllers/viewMentor";

const { signup, signIn } = User;
const router = express.Router();
router.post("/signup", validate.uservalidation, signup);
router.post("/signin", signIn);
router.patch("/user/:id", verify.verifyToken, changeUser.changeStatus);
router.get('/mentors',verify.verifyToken, mentors.get);

//Admin login information
router.post("/admin", adminSignin.adminLogin);

export default router;
