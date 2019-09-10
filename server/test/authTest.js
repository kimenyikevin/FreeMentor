import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import db from '../models/userModels';
import 'idempotent-babel-polyfill';


import {
  createAdmin, invaldToken, realToken, realAdmin,
} from '../helpers/mock';

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;

describe('Test for verifying Token', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    createAdmin();
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

  it('should return error if uer is not admin', (done) => {
    chai
      .request(server)
      .patch('/api/v2/auth/user/3')
      .set('authorization', realToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.error).to.be.equal('you are not an admin');
        done();
      });
  });
  after('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    done();
  });
});

describe('Test for admin to change user to a mentor', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    createAdmin();
    done();
  });
  it('should return error if user does not exit', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/user/0')
      .set('authorization', realAdmin)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('you do not have access to this service (invalid token)');
        done();
      });
  });

  it('should return message User account changed to mentor and data of user', (done) => {
    chai
      .request(server)
      .patch('/api/v2/auth/user/3')
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
});
