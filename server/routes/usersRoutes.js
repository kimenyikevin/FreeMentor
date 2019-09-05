import express from 'express';
import validate from '../middleware/SchemaValidator';
import User from '../controllers/usersController';
import changeUser from '../controllers/changeUSer';
import verify from '../middleware/auth';
// verifyToken, verifyAdmin,
const { signup, signIn } = User;
const {
  verifyToken, verifyAdmin,
} = verify;
const router = express.Router();
router.post('/signup', validate.uservalidation, signup);
router.post('/signin', signIn);
router.patch('/user/:id',verifyToken,verifyAdmin, changeUser.changeStatus);

export default router;
