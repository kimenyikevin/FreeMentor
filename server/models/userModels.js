import { Pool } from 'pg';
import admin from '../controllers/usersController'
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';


dotenv.config();
class User {
  constructor() {
    const {PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT,}= process.env;
    this.pool = new Pool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT,
    });
  this.pool.connect() 
  .then(()=> console.log('db connected'))
  .catch((e)=> console.log(e));   
  this.initialize();
  }
  createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    bio VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL DEFAULT 'user',
    occupation VARCHAR(128) NOT NULL,
    expertise VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`;
  createSessionTable = `CREATE TABLE IF NOT EXISTS
  sessions(
    sessionid SERIAL NOT NULL PRIMARY KEY,
    mentorid INTEGER UNIQUE,
    menteeid INTEGER ,
    questions VARCHAR(128) NOT NULL,
    menteeemail VARCHAR(128) ,
    status VARCHAR(128) NOT NULL DEFAULT 'pending',
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`;
  createAdminTable =`
  INSERT INTO users (id,firstName, lastName, email, password, address, bio,status, occupation, expertise, created_date, modified_date)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `;
  async execute (sql, data = []) {
    const connection = await this.pool.connect() ;
    try {
      if (data.length) return await connection.query(sql, data);
      return await connection.query(sql);
    } catch (error) {
      return error;
    } finally {
      connection.release();
    }
  }
  async initialize() {
    await this.execute(this.createUserTable);
    await this.execute(this.createSessionTable);
    admin.createAdmin();
  }
}
export default new User();
