import express from 'express';
import verify from '../middleware/auth';
import session from '../controllers/sessionController';
const router = express.Router();


const {
    verifyToken, verifyUser, verifyMentor,
  } = verify;
router.post('/sessions', verifyToken, verifyUser, session.fillSession);
router.patch('/sessions/:sessionId/accept', verifyToken, verifyMentor, session.accept);
router.patch('/sessions/:sessionId/reject', verifyToken, verifyMentor, session.reject);
export default router;