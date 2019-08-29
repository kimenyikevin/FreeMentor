import express from 'express';
import validate from '../middleware/SchemaValidator';
import User from '../controllers/usersController';
import changeUser from '../controllers/changeUSer';
import verify from '../middleware/auth';
import mentors from '../controllers/viewMentor';
import session from '../controllers/sessionController';

const { signup, signIn } = User;
const {
  verifyToken, verifyUser, verifyAdmin, verifyMentor,
} = verify;
const { get, getOne } = mentors;
const router = express.Router();
router.post('/signup', validate.uservalidation, signup);
router.post('/signin', signIn);
router.patch('/user/:id', verifyToken, verifyAdmin, changeUser.changeStatus);
router.get('/mentors', verifyToken, verifyUser, get);
router.get('/mentors/:id', verifyToken, verifyUser, getOne);
router.post('/sessions', verifyToken, verifyUser, session.fillSession);
router.patch('/sessions/:sessionId/accept', verifyToken, verifyMentor, session.accept);
router.patch('/sessions/:sessionId/reject', verifyToken, verifyMentor, session.reject);

export default router;
