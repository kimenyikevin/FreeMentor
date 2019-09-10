import express from 'express';
import verify from '../middleware/auth';
import mentors from '../controllers/viewMentor';

const router = express.Router();

const { getOne, get } = mentors;

router.get('/mentors', get);
router.get('/mentors/:id', getOne);
export default router;
