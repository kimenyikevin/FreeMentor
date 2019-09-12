import dotenv from 'dotenv';
import helper from './helper';

dotenv.config();

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
    firstName: 'habimana',
    lastName: 'emmy',
    email: 'habimanaemmy@gmail.com',
    password: 'kigalikigali',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    firstName: 'kimenyi',
    lastName: 'kevin',
    email: 'kimenyikevin@gmail.com',
    password: 'password',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    firstName: 'undefined',
    lastName: 'user',
    email: 'undefineduser@gmail.com',
    password: 'password',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    firstName: 'habimana',
    lastName: 'emmy',
    email: 'habimanaemmy@gmail.com',
    password: 'kigalikigal',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
  {
    firstName: 'testuser',
    lastName: 'testuser',
    email: 'testuser@gmail.com',
    password: 'passwordpass',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
];

export const invaldToken = helper.generateToken(0, '@gmail.com');

export const notExistUserToken = helper.generateToken(0, 'testuser@gmail.com');

export const realToken = helper.generateToken(2, 'usertest@gmail.com');

export const realMentor = helper.generateToken(3, 'mentor@gmail.com');

export const realAdmin = helper.generateToken(1, 'kimenyikevin@gmail.com');

const hashPassword = helper.hashPassword('kigalikigali');
export const insertTestData = `INSERT INTO users ( firstName, lastName, email, password, address, bio, occupation, expertise)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *`;
export const testData = [
  'habimana',
  'emmy',
  'habimanaemmy@gmail.com',
  hashPassword,
  'kigali',
  'engineer',
  'engineer',
  'engineer'
];
export const insertAdmin = `
INSERT INTO users (id,firstName, lastName, email, password, address, bio,status, occupation, expertise)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`;
export const insertSesssion = `INSERT INTO  sessions (sessionid, mentorid, menteeid, questions, menteeemail)
VALUES ($1, $2, $3, $4)
RETURNING *`;
const hashPass = helper.hashPassword('passwordpass');
export const values = [
  1,
  'kimenyi',
  'kevin',
  'kimenyikevin@gmail.com',
  hashPass,
  'kigali',
  'engineer',
  'Admin',
  'engineer',
  'engineer'
];
export const userTest = [
  2,
  'kimenyi',
  'kevin',
  'usertest@gmail.com',
  hashPass,
  'kigali',
  'engineer',
  'user',
  'engineer',
  'engineer'
];

export const mentorTest = [
  3,
  'kimenyi',
  'kevin',
  'mentortest@gmail.com',
  hashPass,
  'kigali',
  'engineer',
  'mentor',
  'engineer',
  'engineer'
];

export const session = [
  1,
  2,
  2,
  'i need help',
  'usertest@gmail.com'
]