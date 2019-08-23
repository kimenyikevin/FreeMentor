import express from 'express';
import User from '../controllers/usersController';
const router = express.Router();
router.post('/', User.create)
export default router;