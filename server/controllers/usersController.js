import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModels/userModels';
import moment from 'moment';
import uuid from 'uuid/v4';
import Helper from '../helpers/helper';
import services from '../services/services'
import 'idempotent-babel-polyfill';


dotenv.config();
class Registered {
  signup = (req, res) => {
    const emailexit = userModel.findByEmail(req.body.email);
    if (emailexit) {
      return res.status(409).send({
        status: 409,
        error: `${emailexit.email}Email already exist`,
      });
    }
    const registeredUser = userModel.create(req.body);
    const token = jwt.sign(
      { id: registeredUser.id },
      process.env.SECRET_KEY,
    );
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  }




//Db controllers
async create(req, res) {
  const text = `INSERT INTO users
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`;
  const {
    firstName, lastName, email, password, address, bio, occupation, expertise,
  } = req.body;
  const hashPassword = Helper.hashPassword(password);
  const values = [ uuid(), firstName, lastName, email, hashPassword, address, bio, occupation, expertise, moment(new Date()), moment(new Date()),];
  try {
    const newUser = await services.servicer(values);
    if(newUser == undefined){
      return res.status(409).send({
        status: 409,
        error: `E-mail ${req.body.email} is alrady exist`,
      });
    }
    const token = Helper.generateToken(newUser.id, newUser.email);
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      token,
      data: {
        data: newUser,
      },
    });
  } catch (error) {
    return res.status(400).send({
      error: `error accured ${error}`,
    });
  }
}

  signIn = (req, res) => {
    const { email, password } = req.body;
    const user = userModel.findByEmail(email);
    try {
      const token = jwt.sign(
        { id: user.id, userType: user.status, email: user.email },
        process.env.SECRET_KEY,
      );
      if (user.email === email && user.password == password) {
        const { password, ...newUser } = user;
        return res.status(200).send({
          status: 200,
          message: 'User is successfully logged in',
          data: {
            token,
            ...newUser,
          },
        });
      }
      return res.status(403).send({
        status: 403,
        error: 'Email or password is wrong',
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        error: 'email does not exist',
      });
    }
  }
}

export default new Registered();
