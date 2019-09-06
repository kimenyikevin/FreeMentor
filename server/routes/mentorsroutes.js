import express from 'express';
import verify from '../middleware/auth';
import mentors from '../controllers/viewMentor';

const router = express.Router();

const {
  verifyToken, verifyUser,
} = verify;
const { get, getOne } = mentors;
router.get('/mentors', verifyToken, verifyUser, get);
router.get('/mentors/:id', verifyToken, verifyUser, getOne);
export default router;
