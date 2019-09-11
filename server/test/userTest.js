import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import db from '../models/userModels';
import { testingData, testData, insertTestData,
} from '../helpers/mock';



const { expect } = chai;
chai.use(chaiHttp);

const newUser = testingData[0];
const existsEmail = testingData[4];
const undefinedUser = testingData[2];
const notMacth = testingData[3];
describe('test for database', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    done();
  });
  it('should return User created successfully', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('User created successfully');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should return error if an email is already exist', (done) => {
    db.execute(insertTestData, testData);
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal(`E-mail ${newUser.email} is alrady exist`);
        done();
      });
  });
  it('should return error if user is not exit', (done) => {
    db.execute(insertTestData, testData);
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(undefinedUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`${undefinedUser.email} does not exist in our database`);
        done();
      });
  });
  it('should return User is successfully logged in', (done) => {
    db.execute(insertTestData, testData);
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('User is successfully logged in');
        expect(res.body.token).to.be.an('string');
        done();
      });
  });
  it('should return error if Email and password did not match', (done) => {
      db.execute(insertTestData, testData)
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(notMacth)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('E-mail and password do not match');
        done();
      });
  });
});
