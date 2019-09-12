import db from '../models/userModels';
class changeService{
    service = async (id) => {
        const findOne = 'SELECT * FROM users WHERE id=$1';
        const updateOne =`UPDATE users
          SET status=$1
          WHERE id=$2 returning *`;
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
