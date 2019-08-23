import express from 'express';
import validate from '../middleware/SchemaValidator';
import User from '../controllers/usersController';
const { signup, signIn} = User;
const router = express.Router();
router.post('/signup', validate.uservalidation, signup);
router.post('/signin', signIn)
export default router;