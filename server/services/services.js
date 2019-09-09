import db from '../models/usersModels/userModels';
import Helper from '../helpers/helper';
import 'idempotent-babel-polyfill';

const sample = {
  async servicer(values) {
    const text = `INSERT INTO users
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING *`;
    try {
      const newUser = await db.execute(text, values);
      if (newUser.routine === '_bt_check_unique') {
        return undefined;
      }
      const { rows } = newUser;
      return rows[0];
    } catch (error) {
      console.log('error accured in service');
    }
  },
  async loginService(email, password) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.execute(text, [email]);
      if (!rows[0]) {
        return undefined;
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return false;
      }
      return rows[0];
    } catch (error) {
      console.log(`error accured ${error}`);
    }
  },
};

export default sample;
