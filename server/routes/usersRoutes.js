import express from 'express';
import validate from '../middleware/SchemaValidator';
import User from '../controllers/usersController';
import changeUser from '../controllers/changeUSer';
import verify from '../middleware/auth';


const {
  signup, signIn, create, login,
} = User;
const {
  verifyToken, verifyAdmin,
} = verify;
const router = express.Router();
router.post('/signUp', validate.uservalidation, create);
router.post('/signup', validate.uservalidation, signup);
router.post('/signIn', login);
router.post('/signin', signIn);
router.patch('/user/:id', verifyToken, verifyAdmin, changeUser.changeStatus);

export default router;
