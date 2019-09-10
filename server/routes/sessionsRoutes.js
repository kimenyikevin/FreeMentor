import express from 'express';
import verify from '../middleware/auth';
import session from '../controllers/sessionController';

const router = express.Router();


router.post('/sessions', session.fillSession);
router.patch('/sessions/:sessionId/accept', session.accept);
router.patch('/sessions/:sessionId/reject', session.reject);
export default router;
