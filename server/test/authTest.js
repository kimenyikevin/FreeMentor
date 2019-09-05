import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import dotenv from 'dotenv';
import mochData from '../helpers/mochData';
import session from '../models/sessionModels';
import user from '../models/usersModels/userModels';
import { userData, sessionData } from '../helpers/mock';
user.create(userData[0]);
user.create(userData[1]);
user.create(userData[2]);
user.create(userData[3]);

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;

session.create(sessionData[0]);
session.create(sessionData[1]);
session.create(sessionData[2]);
session.create(sessionData[3]);

let invaldToken = mochData.mochData();
// when user does not exist
let notExistUserToken = mochData.mochDataNotExist();
let set = `adminToken ${notExistUserToken}`;
// real token for user
let realToken = mochData.mochDataRealToken();
let setUserToken = `adminToken ${realToken}`;
// real token for Mentor
let realMentor = mochData.mochDataRealMentor();
let setMentorToken = `adminToken ${realMentor}`;

// real admin token
let realAdmin = mochData.mochDataRealAdmin();
let setAdminToken = `adminToken ${realAdmin}`;

// create session
const fromMocha = mochData.data;
const {createSession} = fromMocha;
const testSession = createSession
// Test for user model
const findEmail = user.findByEmail('kimenyikevin@gmail.com');
const findId = user.findById(1);
const findAll = user.findAll();
const update = user.update(1);
describe('Test for user model', () => {
  it('find by email', () => {
    expect(findEmail).to.be.an('object');
  });
  it('find by id', () => {
    expect(findId).to.be.an('object');
  });
  it('find all', () => {
    expect(findAll).to.be.an('Array');
  });
  it('update function', () => {
    expect(update).to.be.an('String');
  });
});

describe('Test for verifying Token', () => {
  it('should return error if Token is invalid', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`your data do not found in our data stucture`);
        done();
      });
  });

  it('should return error if head of token is undefined', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('undefined', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal(`please specify head of token`);
        done();
      });
  });
  it('should return error if user in token no longer available', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', set)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`user with this token is not found in our data structure`);
        done();
      });
  });

  //verify mentor
  it('should return error if uer is not mentor', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', setUserToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('you are not mentor');
        done();
      });
  });
  // reject session request
  it('should return error if id of session is not exist', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/0/reject')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('id you try to access is not found');
        done();
      });
  });
  it('should return data of session after rejection', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include(testSession);
        done();
      });
  });
  // accept session request
  it('should return error if id of session is not exist', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/0/accept')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('id you try to access is not found');
        done();
      });
  });
  it('should return data of session after accepted', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/accept')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include(testSession);
        done();
      });
  });
});
//create sessions

describe('Test for create a sessions', () => {
  it('user can create sessions ', done => {
    chai
      .request(server)
      .post('/api/v1/auth/sessions')
      .set('authorization', setUserToken)
      .send(testSession)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('session created successful');
        done();
      });
  });
});
//view Mentors

describe('Test for view all mentor', () => {
  it('view all mentor available', done => {
    chai
      .request(server)
      .get('/api/v1/auth/mentors')
      .set('authorization', setUserToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('Array');
        done();
      });
  });
  //verify user
  it('test for verify user', done => {
    chai
      .request(server)
      .get('/api/v1/auth/mentors')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('you are not user');
        done();
      });
  });
});
describe('Test for specific mentor', () => {
  it('should return error if a mentor does not exit', done => {
    chai
      .request(server)
      .get('/api/v1/auth/mentors/0kkk')
      .set('authorization', setUserToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('id must be a number');
        done();
      });
  });
  const mentorData = user.User[0];
  const { password, ...newMentorData } = mentorData;
  it('should show details of specific mentor', done => {
    chai
      .request(server)
      .get('/api/v1/auth/mentors/1')
      .set('authorization', setUserToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include(newMentorData);
        done();
      });
  });
  it('should return error if user is not mentor', done => {
    chai
      .request(server)
      .get('/api/v1/auth/mentors/2')
      .set('authorization', setUserToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('user you try to access is not mentor');
        done();
      });
  });
});

// change user to mentors
describe('Test for admin to change user to a mentor', () => {
  //verify Admin
  it('should return error if user is not admin', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/2')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('you are not an admin');
        done();
      });
  });
  it('should return error if user does not exit', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/0')
      .set('authorization', setAdminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('data not  found');
        done();
      });
  });
  const mentorData = user.User[1];
  const { password, status, ...newMentorData } = mentorData;
  it('should return message User account changed to mentor and data of user', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/2')
      .set('authorization', setAdminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.be.equal('User account changed to mentor');
        expect(res.body.data).to.include(newMentorData);
        done();
      });
  });
  it('should return message User account is a mentor', done => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/1')
      .set('authorization', setAdminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('this user is a mentor');
        done();
      });
  });
});
