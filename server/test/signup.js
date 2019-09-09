import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import userModel from '../models/usersModels/userModels';
import { userData, testingData } from '../helpers/mock';


const { expect } = chai;
chai.use(chaiHttp);

const dataExist = userData[1];
const { id, status, ...newDataExist } = dataExist;
const newData = testingData[0];
const validateDate = testingData[1];

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
      .send(newData)
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
      .send(newData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal(`E-mail ${newData.email} is alrady exist`);
        done();
      });
  });
});

describe('Test for user sign up', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    userModel.User = [];
    userModel.create(userData[0]);
    userModel.create(userData[1]);
    userModel.create(userData[2]);
    userModel.create(userData[3]);
    done();
  });
  it('should return error if validation meet with error', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(validateDate)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  after('Clear data from database', (done) => {
    chai.request(server);
    userModel.User = [];
    done();
  });
});
