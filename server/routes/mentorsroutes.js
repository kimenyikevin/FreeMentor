import express from 'express';
import verify from '../middleware/auth';
import mentors from '../controllers/viewMentor';

const router = express.Router();

const { getOne, getAll } = mentors;
const { VerifyToken, verifyMentor, verifyAdmin } = verify;
router.get('/mentors', VerifyToken, getAll);
router.get('/mentors/:id', VerifyToken, getOne);
export default router;
