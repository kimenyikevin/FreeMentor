import db from '../models/userModels';
import Helper from '../helpers/helper';
import 'idempotent-babel-polyfill';

const serviceData = {
  async servicer(values) {
    const text = `INSERT INTO users ( firstName, lastName, email, password, address, bio, occupation, expertise)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
  async loginService(email, pass) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.execute(text, [email]);
      if (!rows[0]) {
        return undefined;
      }
      if (!Helper.comparePassword(rows[0].password, pass)) {
        return false;
      }
      const { password, ...newLogin } = rows[0];
      return newLogin;
    } catch (error) {
      console.log(`error accured ${error}`);
    }
  },
  async defaultAdmin(admin) {
    const { rows } = await db.execute('SELECT * FROM users WHERE status = $1', ['Admin']);
    try {
      if (!rows[0]) {
        await db.execute(db.createAdminTable, admin);
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  },
};

export default serviceData;
