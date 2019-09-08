import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import userModel from '../models/usersModels/userModels';
import { userData, testingData } from '../helpers/mock';


const { expect } = chai;
chai.use(chaiHttp);
const signIn = testingData[3];
const signInWrongData = testingData[2];
const dataExist = userData[1];
const { id, status, ...newDataExist } = dataExist;

describe('Test for user sign in', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    userModel.User = [];
    userModel.create(userData[0]);
    userModel.create(userData[1]);
    userModel.create(userData[2]);
    userModel.create(userData[3]);
    done();
  });
  it('should return error if user is not exit', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(signIn)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('email does not exist');
        done();
      });
  });

  it('should return User is successfully logged in', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(newDataExist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('User is successfully logged in');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });

  it('should return error if Email and password did not match', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(signInWrongData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('Email or password is wrong');
        done();
      });
  });
  after('Clear data from database', (done) => {
    chai.request(server);
    userModel.User = [];
    done();
  });
});
