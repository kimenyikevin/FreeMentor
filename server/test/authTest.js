import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import session from '../models/sessionModels';
import user from '../models/usersModels/userModels';
import {
  userData, sessionData, invaldToken, notExistUserToken, realToken, realMentor, realAdmin, testingData,
} from '../helpers/mock';


dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;

const set = `adminToken ${notExistUserToken}`;

const setUserToken = `adminToken ${realToken}`;

const setMentorToken = `adminToken ${realMentor}`;

const setAdminToken = `adminToken ${realAdmin}`;

const testSession = testingData[4];

// const findEmail = user.findByEmail('kimenyikevin@gmail.com');
// const findId = user.findById(1);
// const findAll = user.findAll();
// const update = user.update(1);
// describe('Test for user model', () => {
//   it('find by email', () => {
//     expect(findEmail).to.be.an('object');
//   });
//   it('find by id', () => {
//     expect(findId).to.be.an('object');
//   });
//   it('find all', () => {
//     expect(findAll).to.be.an('Array');
//   });
//   it('update function', () => {
//     expect(update).to.be.an('String');
//   });
// });

describe('Test for verifying Token', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    user.create(userData[0]);
    user.create(userData[1]);
    user.create(userData[2]);
    user.create(userData[3]);
    session.Session = [];
    session.create(sessionData[0]);
    session.create(sessionData[1]);
    session.create(sessionData[2]);
    session.create(sessionData[3]);
    done();
  });
  it('should return error if Token is invalid', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('your data do not found in our data stucture');
        done();
      });
  });

  it('should return error if head of token is undefined', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('undefined', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('please specify head of token');
        done();
      });
  });
  it('should return error if user in token no longer available', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/2/reject')
      .set('authorization', set)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal(
          'user with this token is not found in our data structure',
        );
        done();
      });
  });

  it('should return error if uer is not mentor', (done) => {
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

  it('should return error if id of session is not exist', (done) => {
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
  it('should return data of session after rejection', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/cfgv/reject')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('id must be a number');
        done();
      });
  });
  it('should return data of session after rejection', (done) => {
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
  it('should return data of session after rejection', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/sessions/cfgv/accept')
      .set('authorization', setMentorToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('id must be a number');
        done();
      });
  });
  it('should return error if id of session is not exist', (done) => {
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
  it('should return data of session after accepted', (done) => {
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
  it('user can create sessions ', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/sessions')
      .set('authorization', setUserToken)
      .send(testSession)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('session created successful');
        done();
      });
  });
  after('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    session.Session = [];
    done();
  });
});

describe('Test for view all mentor', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    user.create(userData[0]);
    user.create(userData[1]);
    user.create(userData[2]);
    user.create(userData[3]);
    done();
  });
  it('view all mentor available', (done) => {
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

  it('test for verify user', (done) => {
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
  it('should return error if a mentor does not exit', (done) => {
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
  const mentorData = userData[0];
  const { password, ...newMentorData } = mentorData;
  it('should show details of specific mentor', (done) => {
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
  it('should return error if user is not mentor', (done) => {
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
  after('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    session.Session = [];
    done();
  });
});

describe('Test for admin to change user to a mentor', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    user.create(userData[0]);
    user.create(userData[1]);
    user.create(userData[2]);
    user.create(userData[3]);
    done();
  });
  it('should return error if user is not admin', (done) => {
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
  it('should return error if you provide wrong id', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/fcvg')
      .set('authorization', setAdminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('id must be a number');
        done();
      });
  });
  it('should return error if user does not exit', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/0')
      .set('authorization', setAdminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('id you is not found in our data structure');
        done();
      });
  });
  const mentorData = userData[1];
  const { password, status, ...newMentorData } = mentorData;
  it('should return message User account changed to mentor and data of user', (done) => {
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
  it('should return message User account is a mentor', (done) => {
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
  after('Clear data from database', (done) => {
    chai.request(server);
    user.User = [];
    session.Session = [];
    done();
  });
});
