import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';

dotenv.config();
class User {
  constructor() {
    this.User = [
      {
        id: 1,
        firstName: 'kwizera',
        lastName: 'eric',
        email: 'admin@gmail.com',
        password: 'kigali',
        address: 'kigali',
        bio: 'engineer',
        status: 'admin',
        occupation: 'engineer',
        expertise: 'engineer'
      },
    ];
    this.pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    });
  this.pool.connect() 
  .then(()=> console.log('db connected'))
  .catch((e)=> console.log(e));   
  this.initialize();
  }

  createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    bio VARCHAR(128) NOT NULL,
    occupation VARCHAR(128) NOT NULL,
    expertise VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`;
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
  }
  create(data) {
    const userid = this.User.length + 1;
    const newUser = {
      id: userid,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      password: data.password || '',
      address: data.address || '',
      bio: data.bio || '',
      status: data.status || 'user',
      occupation: data.occupation || '',
      expertise: data.expertise || '',
    };
    this.User.push(newUser);
    return newUser;
  }
  findByEmail = (email) => {
    return this.User.find((found) => found.email == email);
  }

  findById = (id) => {
    return this.User.find((found) => found.id == id);
  }

  findAll = () => {
    return this.User.filter((found) => found.status == 'mentor');
  }

  update = (id) => {
    const reflection = this.findById(id);
    const index = this.User.indexOf(reflection);
    return this.User[index].status;
  }
}
export default new User();
