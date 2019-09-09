import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id, email) {
    const token = jwt.sign({
      userId: id, userEmail: email,
    },
    process.env.SECRET_KEY, { expiresIn: '5d' });
    return token;
  },
};

export default Helper;
