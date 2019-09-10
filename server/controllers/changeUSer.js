import db from '../models/userModels';
import moment from 'moment';

class changeUser {
   update = async (req, res) => {
    const findOne = 'SELECT * FROM users WHERE id=$1';
    const updateOne =`UPDATE users
      SET status=$1, modified_date=$2
      WHERE id=$3 returning *`;
    try {
      if(isNaN(req.params.id)){
        return res.status(401).send({
          status: 401,
          error: 'id must be a number',
        });
      }
      const { rows } = await db.execute(findOne, [req.params.id]);
      if(rows[0].status == 'mentor' || rows[0].status == 'admin') {
        return res.status(409).send({
          status: 409,
          error: 'this user is a mentor',
        });
      }
      const values = [
        'mentor',
        moment(new Date()),
        req.params.id, 
      ];
       await db.execute(updateOne, values);
      return res.status(200).send({
           status: 200,
           message: 'user account changed to mentor'
      });
    } catch(err) {
      res.status(404).send({
        status: 404,
        error: 'id you are trying to find is not found',
      });
    }
  };
}
export default new changeUser();
