import db from '../models/usersModels/userModels';
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
};

export default sample;
