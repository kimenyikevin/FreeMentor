import express from 'express';
import verify from '../middleware/auth';
import session from '../controllers/sessionController';

const router = express.Router();

const { VerifyToken, verifyMentor } = verify;
router.post('/sessions',VerifyToken, session.fillSession);
export default router;
