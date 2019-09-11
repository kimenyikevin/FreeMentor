import dotenv from 'dotenv';
import db from '../models/userModels';
import moment from 'moment';
import Helper from '../helpers/helper';
import services from '../services/services'
import 'idempotent-babel-polyfill';



dotenv.config();
class Registered { 
  create = async (req, res) => {
  const {
    firstName, lastName, email, password, address, bio, occupation, expertise,
  } = req.body;
  const hashPassword = Helper.hashPassword(password);
  const values = [firstName, lastName, email, hashPassword, address, bio, occupation, expertise, moment(new Date()), moment(new Date()),];
  try {
    const newUser = await services.servicer(values);
    if(newUser == undefined){
      return res.status(409).send({
        status: 409,
        error: `E-mail ${req.body.email} is alrady exist`,
      });
    }
    const token = Helper.generateToken(newUser.id, newUser.email);
    const {password, ...registeredUser} = newUser;
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      token,
      data: registeredUser,
    });
  } catch (error) {
    return res.status(400).send({
      error: `error accured ${error}`,
    });
  }
}


async login(req, res) {
  const {email, password} = req.body;
  try {
    const signedUser = await services.loginService(email, password);
    if (signedUser == undefined) {
      return res.status(404).send({
        status: 404,
         error: `${email} does not exist in our database` 
        });
    }
    if(signedUser == false) {
      return res.status(400).send({ 
        status: 400,
        error: 'E-mail and password do not match' 
      });
    }
    const token = Helper.generateToken(signedUser.id, signedUser.email);
    return res.status(200).send({
      status: 200,
      message: 'User is successfully logged in',
      token:  token,
       data: signedUser
      });
  } catch (error) {
    return res.status(400).send({
      error: `error accured ${error}`,
    });
  }
}
async createAdmin() {
  try {
      const hashPassword = Helper.hashPassword('password');
      const values =  [
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
          moment(new Date())
      ];
    await services.defaultAdmin(values);
  } catch (error) {
    console.log( `error ${error}`);
  }
}
}

export default new Registered();
