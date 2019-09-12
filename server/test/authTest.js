import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import db from '../models/userModels';
import 'idempotent-babel-polyfill';

import {
  invaldToken, realToken, realAdmin, values, insertAdmin, userTest, mentorTest, realMentor, insertSesssion, session
} from '../helpers/mock';

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;

describe('Test for verifying Token', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    done();
  });
  it('should return error if Token is invalid', (done) => {
    chai
      .request(server)
      .patch('/api/v2/auth/user/3')
      .set('authorization', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('you do not have access to this service (invalid token)');
        done();
      });
  });

  it('should return error if head of token is undefined', (done) => {
    chai
      .request(server)
      .patch('/api/v2/auth/user/5')
      .set('undefined', invaldToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('please provide header a long with token');
        done();
      });
  });
});

describe('Test for admin to change user to a mentor', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    done();
  });
  it('should return error if user does not exit', (done) => {
    db.execute(insertAdmin, values);
    chai
      .request(server)
      .patch('/api/v2/auth/user/0')
      .set('authorization', realAdmin)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('you do not have access to this service (invalid token)');
        done();
      });
  });

  it('should return message User account changed to mentor and data of user', (done) => {
    db.execute(insertAdmin, values);
    db.execute(insertAdmin, userTest);
    chai
      .request(server)
      .patch('/api/v2/auth/user/2')
      .set('authorization', realAdmin)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('user account changed to mentor');
        done();
      });
  });
  it('should return message User account is a mentor', (done) => {
    chai
      .request(server)
      .patch('/api/v2/auth/user/2')
      .set('authorization', realAdmin)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal('this user is a mentor');
        done();
      });
  });
  it('should return error if uer is not admin', (done) => {
    db.execute(insertAdmin, values);
    db.execute(insertAdmin, userTest);
    chai
      .request(server)
      .patch('/api/v2/auth/user/2')
      .set('authorization', realToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('you are not an admin');
        done();
      });
  });
});
describe('Test for user to view mentor', () => {
  it('should return all mentors', (done) => {
    db.execute(insertAdmin, userTest);
    chai
      .request(server)
      .get('/api/v2/auth/mentors')
      .set('authorization', realToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('Array');
        done();
      });
  });
  it('should return specific mentor', (done) => {
    db.execute(insertAdmin, mentorTest);
    chai
      .request(server)
      .get('/api/v2/auth/mentors/3')
      .set('authorization', realToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should return error when id is not found', (done) => {
    chai
      .request(server)
      .get('/api/v2/auth/mentors/0')
      .set('authorization', realToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('user you try to access is not mentor');
        done();
      });
  });
});
const remove = {
  mentorid: 3,
  questions: 'i need help',
};
const invalidId = {
  mentorid: 0,
  questions: 'i need help',
};
describe('Test for creating session', () => {
  it('should return session createed ', (done) => {
    db.execute(insertAdmin, userTest);
    db.execute(insertAdmin, mentorTest);
    chai
      .request(server)
      .post('/api/v2/auth/sessions')
      .set('authorization', realToken)
      .send(remove)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('session created successful');
        expect(res.body.data).to.be.an('Array');
        done();
      });
  });
  it('should return error if you created session too times ', (done) => {
    db.execute(insertAdmin, userTest);
    db.execute(insertAdmin, mentorTest);
    chai
      .request(server)
      .post('/api/v2/auth/sessions')
      .set('authorization', realToken)
      .send(remove)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal('you can not request mentorship twice');
        done();
      });
  });
  it('should return error if mentor id does not exist ', (done) => {
    db.execute(insertAdmin, userTest);
    db.execute(insertAdmin, mentorTest);
    chai
      .request(server)
      .post('/api/v2/auth/sessions')
      .set('authorization', realToken)
      .send(invalidId)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('user with this id is not found or check if your are passing correct data');
        done();
      });
  });
  it('should return error if session does not exist ', (done) => {
    db.execute(insertAdmin, mentorTest);
    chai
      .request(server)
      .patch('/api/v2/auth/sessions/0/accept')
      .set('authorization', realMentor)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('this session does not exist');
        done();
      });
  });
  it('should return error if session does not exist', (done) => {
    db.execute(insertAdmin, mentorTest);
    db.execute(insertAdmin, userTest);
    chai
      .request(server)
      .patch('/api/v2/auth/sessions/0/reject')
      .set('authorization', realMentor)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('this session does not exist');
        done();
      });
  });
  after('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM sessions');
    done();
  });
});
