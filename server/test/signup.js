import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import userModel from '../models/usersModels/userModels';
import { userData } from '../helpers/mock';
import mochData from '../helpers/mochData';

const { expect } = chai;
chai.use(chaiHttp);
const fromMocha = mochData.data;
const {
  userdata, otherdata,
} = fromMocha;
const dataExist = userData[1];
const { id, status, ...newDataExist } = dataExist;

userModel.User = [];
userModel.create(userData[0]);
userModel.create(userData[1]);
userModel.create(userData[2]);
userModel.create(userData[3]);

describe('Test for user sign up', () => {
  it('should return error if an email is already exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(newDataExist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal(`${newDataExist.email}Email already exist`);
        done();
      });
  });
  it('should return User created successfully', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(userdata)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('User created successfully');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('should return error if validation meet with error', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(otherdata)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
});
