import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const { expect } = chai;
chai.use(chaiHttp);
const data = {
  firstName: 'bavakure',
  lastName: 'eric',
  email: 'kimenyik@gmail.com',
  password: 'kigali',
  address: 'kigali',
  bio: 'engineer',
  occupation: 'engineer',
  expertise: 'engineer'
};
const validation = {
  firstName: 'bavakure',
  lastName: '',
  email: 'kimenyik.com',
  password: 'ki',
  address: 'kigali',
  bio: 'engineer',
  occupation: 'engineer',
  expertise: 'engineer'
};
const dataexist = {
  firstName: 'bavakure',
  lastName: 'eric',
  email: 'habimanaemmy@gmail.com',
  password: 'kigali',
  address: 'kigali',
  bio: 'engineer',
  occupation: 'engineer',
  expertise: 'engineer'
};
describe('Test for user sign up', () => { 

  it('should return error if an email is already exist', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(dataexist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal(`${dataexist.email}Email already exist`);
        done();
      });
  });

  it('should return User created successfully', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('User created successfully');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('should return error if validation meet with error', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .set('accept', 'application/json')
      .send(validation)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        // expect(res.body.error).to.be.include()
        done();
      });
  });
});

/*******************SignIn**********************************/
const signInData = { email: '@gmail.com', password: 'kigali' };
const wrongData = { email: 'habimanaemmy@gmail.com', password: '' };
describe('Test for user sign in', () => {
  it('should return error if user is not exit', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(signInData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal('email does not exist');
        done();
      });
  });

  it('should return User is successfully logged in', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(dataexist)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('User is successfully logged in');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });

  it('should return error if Email and password did not match', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .set('accept', 'application/json')
      .send(wrongData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.be.equal('Email or password is wrong');
        done();
      });
  });
});
