import { Pool } from 'pg';
import admin from '../controllers/usersController'
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';


dotenv.config();
class User {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
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
    expertise VARCHAR(128) NOT NULL
  )`;
  createSessionTable = `CREATE TABLE IF NOT EXISTS
  sessions(
    sessionid SERIAL NOT NULL PRIMARY KEY,
    mentorid INTEGER,
    menteeid INTEGER ,
    questions VARCHAR(128) NOT NULL UNIQUE,
    menteeemail VARCHAR(128) ,
    status VARCHAR(128) NOT NULL DEFAULT 'pending'
  )`;
  createAdminTable =`
  INSERT INTO users (id,firstName, lastName, email, password, address, bio,status, occupation, expertise)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
