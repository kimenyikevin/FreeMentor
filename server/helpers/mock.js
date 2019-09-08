import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const userData = [
  {
    id: 1,
    firstName: 'kimenyi',
    lastName: 'kevin',
    email: 'kimenyikevin@gmail.com',
    password: 'kigali',
    address: 'kigali',
    bio: 'engineer',
    status: 'mentor',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    id: 2,
    firstName: 'habimana',
    lastName: 'emmy',
    email: 'habimanaemmy@gmail.com',
    password: 'kigali',
    address: 'kigali',
    bio: 'engineer',
    status: 'user',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    id: 3,
    firstName: 'kwizera',
    lastName: 'eric',
    email: 'admin@gmail.com',
    password: 'kigali',
    address: 'kigali',
    bio: 'engineer',
    status: 'admin',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    id: 4,
    firstName: 'bavakure',
    lastName: 'eric',
    email: 'kimenyike@gmail.com',
    password: 'kigali',
    address: 'kigali',
    bio: 'engineer',
    status: 'mentor',
    occupation: 'engineer',
    expertise: 'engineer',
  },
];
export const sessionData = [
  {
    Sessionid: 1,
    mentorId: 1,
    menteeId: 2,
    questions: 'i need help',
    menteeEmail: 'kimenyikevin@gmail.com',
    status: 'pending',
  },
  {
    Sessionid: 2,
    mentorId: 3,
    menteeId: 1,
    questions: 'i need help',
    menteeEmail: 'kimenyikevin@gmail.com',
    status: 'pending',
  },
  {
    Sessionid: 3,
    mentorId: 4,
    menteeId: 2,
    questions: 'i need help',
    menteeEmail: 'kimenyikevin@gmail.com',
    status: 'pending',
  },
  {
    Sessionid: 4,
    mentorId: 5,
    menteeId: 3,
    questions: 'i need help',
    menteeEmail: 'kimenyikevin@gmail.com',
    status: 'pending',
  },
];
export const testingData = [
  {
    firstName: 'bavakure',
    lastName: 'eric',
    email: 'kimenyik@gmail.com',
    password: 'kigali',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    firstName: 'bavakure',
    lastName: '',
    email: ' kimenyik.com',
    password: 'ki',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    email: 'habimanaemmy@gmail.com',
    password: '',
  },
  {
    email: ' @gmail.com',
    password: 'kigali',
  },
  {
    mentorId: 3,
    questions: 'i need help',
  },
];
export const invaldToken = jwt.sign(
  { id: 0, userType: 'user', email: '@gmail.com' },
  process.env.SECRET_KEY,
);

export const notExistUserToken = jwt.sign(
  { id: 0, userType: 'user', email: 'habimanaemmy@gmail.com' },
  process.env.SECRET_KEY,
);
export const realToken = jwt.sign(
  { id: 2, userType: 'user', email: 'habimanaemmy@gmail.com' },
  process.env.SECRET_KEY,
);
export const realMentor = jwt.sign(
  { id: 1, userType: 'mentor', email: 'kimenyikevin@gmail.com' },
  process.env.SECRET_KEY,
);
export const realAdmin = jwt.sign(
  { id: 3, userType: 'admin', email: 'kwizeraeric@gmail.com' },
  process.env.SECRET_KEY,
);
