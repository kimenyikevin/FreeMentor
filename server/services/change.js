import db from '../models/userModels';
import moment from 'moment';
class changeService{
    service = async (id) => {
        const findOne = 'SELECT * FROM users WHERE id=$1';
        const updateOne =`UPDATE users
          SET status=$1, modified_date=$2
          WHERE id=$3 returning *`;
        try {
          if(isNaN(id)){
            return undefined;
          }
          const { rows } = await db.execute(findOne, [id]);
          if(rows[0].status == 'mentor' || rows[0].status == 'admin') {
                  return false;
          }
          const values = [
            'mentor',
            moment(new Date()),
            id, 
          ];
      const newMentor = await db.execute(updateOne, values);
          return newMentor;
        } catch(err) {
         console.log(`error accured in service ${err}`);
        }
      };
}
export default new changeService();
