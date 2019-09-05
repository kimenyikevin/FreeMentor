import express from 'express';
import verify from '../middleware/auth';
import mentors from '../controllers/viewMentor';
import validation from '../middleware/SchemaValidator'
const router = express.Router();

const {
    verifyToken, verifyUser,
  } = verify;
  const { get, getOne } = mentors;
router.get('/mentors', verifyToken, verifyUser, get);
router.get('/mentors/:id',validation.pathVaridete, verifyToken, verifyUser, getOne);
export default router;