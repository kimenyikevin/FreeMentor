import express from 'express';
import verify from '../middleware/auth';
import session from '../controllers/sessionController';

const router = express.Router();

const { VerifyToken, verifyMentor } = verify;
router.post('/sessions', VerifyToken, session.fillSession);
router.patch('/sessions/:sessionId/accept', VerifyToken, verifyMentor, session.accept);
router.patch('/sessions/:sessionId/reject', VerifyToken, verifyMentor, session.reject);
export default router;
