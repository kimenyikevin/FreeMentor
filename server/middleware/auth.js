import jwt from 'jsonwebtoken';
import db from '../models/userModels';

class adminAuth {
  verifyAdmin = (req, res, next) => {
    const { status } = req.currentUser;
    if (status !== 'Admin') {
      return res.status(403).send({
        status: 403,
        error: 'you are not an admin',
      });
    }
    next();
  }

  verifyMentor = (req, res, next) => {
    const { status } = req.currentUser;
    if (status !== 'mentor') {
      return res.status(403).send({
        status: 403,
        error: 'you are not mentor',
      });
    }
    next();
  }

  async VerifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
      return res.status(401).send({
        status: 401,
        error: 'please provide header a long with token',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.execute(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'you do not have access to this service (invalid token)',
        });
      }
      req.currentUser = rows[0];
      req.user = { id: decoded.userId };
      next();
    } catch(error) {
      return res.status(404).send({
        status: 404,
        error: 'your data do not found in our data base',
      });
    }
  }
}
export default new adminAuth();
