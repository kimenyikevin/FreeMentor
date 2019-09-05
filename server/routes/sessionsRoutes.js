import express from 'express';
import verify from '../middleware/auth';
import session from '../controllers/sessionController';
import validation from '../middleware/SchemaValidator'
const router = express.Router();



const {
    verifyToken, verifyUser, verifyMentor,
  } = verify;
router.post('/sessions',verifyToken, verifyUser, session.fillSession);
router.patch('/sessions/:sessionId/accept',validation.pathValidate, verifyToken, verifyMentor, session.accept);
router.patch('/sessions/:sessionId/reject',validation.pathValidate, verifyToken, verifyMentor, session.reject);
export default router;