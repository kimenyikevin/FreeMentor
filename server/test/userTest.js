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

describe('test for database', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    userModel.execute('DELETE FROM users');
    done();
  });
  it('should return User created successfully', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signUp')
      .set('accept', 'application/json')
      .send(newDataExist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('User created successfully');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should return error if an email is already exist', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signUp')
      .set('accept', 'application/json')
      .send(newDataExist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal(`E-mail ${newDataExist.email} is alrady exist`);
        done();
      });
  });
  it('should return error if user is not exit', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signIn')
      .set('accept', 'application/json')
      .send(signIn)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`${signIn.email} does not exist in our database`);
        done();
      });
  });
  it('should return User is successfully logged in', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signIn')
      .set('accept', 'application/json')
      .send(newDataExist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('User is successfully logged in');
        expect(res.body.token).to.be.an('string');
        done();
      });
  });
  it('should return error if Email and password did not match', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signIn')
      .set('accept', 'application/json')
      .send(signInWrongData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('E-mail and password do not match');
        done();
      });
  });
});
