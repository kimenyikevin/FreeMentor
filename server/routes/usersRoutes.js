import express from 'express';
import validate from '../middleware/SchemaValidator';
import User from '../controllers/usersController';
import changeUser from '../controllers/changeUSer';
import verify from '../middleware/auth';


const {
  create, login,
} = User;
const {
  verifyAdmin, VerifyToken,
} = verify;
const router = express.Router();
router.post('/signup', validate.uservalidation, create);
router.post('/signin', login);
router.patch('/user/:id', VerifyToken, verifyAdmin, changeUser.update);

export default router;
