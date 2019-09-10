import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
import helper from './helper';
import db from '../models/userModels';

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
    password: 'kigali',
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
    password: 'kigalii',
    address: 'kigali',
    bio: 'engineer',
    occupation: 'engineer',
    expertise: 'engineer',
  },
];
export const invaldToken = helper.generateToken(0, '@gmail.com');

export const notExistUserToken = helper.generateToken(0, 'testuser@gmail.com');

export const realToken = helper.generateToken(3, 'testuser@gmail.com');

export const realMentor = helper.generateToken(2, 'mentor@gmail.com');

export const realAdmin = helper.generateToken(1, 'kimenyikevin@gmail.com');


export const createAdmin = async () => {
  const createAdminTable = `
  INSERT INTO users (id, firstName, lastName, email, password, address, bio,status, occupation, expertise, created_date, modified_date)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `;

  const { rows } = await db.execute('SELECT * FROM users WHERE status = $1', ['Admin']);
  try {
    if (!rows[0]) {
      const hashPassword = helper.hashPassword('password');
      await db.execute(createAdminTable, [
        1,
        'kimenyi',
        'kevin',
        'kimenyikevin@gmail.com',
        hashPassword,
        'kigali',
        'engineer',
        'Admin',
        'engineer',
        'engineer',
        moment(new Date()),
        moment(new Date()),
      ]);
    }
    const hashPassword = helper.hashPassword('password');
    await db.execute(createAdminTable, [
      2,
      'mentor',
      'mentor',
      'mentor@gmail.com',
      hashPassword,
      'kigali',
      'engineer',
      'mentor',
      'engineer',
      'engineer',
      moment(new Date()),
      moment(new Date()),
    ]);
    await db.execute(createAdminTable, [
      3,
      'testuser',
      'testuser',
      'testuser@gmail.com',
      hashPassword,
      'kigali',
      'engineer',
      'user',
      'engineer',
      'engineer',
      moment(new Date()),
      moment(new Date()),
    ]);
  } catch (error) {
    console.log(`error ${error}`);
  }
};
