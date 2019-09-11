import db from '../models/userModels'
import moment from 'moment'
class sessionService {
   createSession = async (values) => {
       const text = `INSERT INTO  sessions ( mentorid, menteeid, questions, menteeemail, created_date, modified_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`;
       const findOne = 'SELECT * FROM users WHERE id=$1';
       try {
           const mentor  = await db.execute(findOne, [values[0]]);
           if(!mentor.rows){
               return undefined;
           }
          
          if(mentor.rows[0].status !== 'mentor'){
             return false;
          }
          const  newSession  = await db.execute(text, values);
          if (newSession.routine === '_bt_check_unique') {
           return true;
         }
         const { rows } = newSession;
          return rows;
       } catch(err) {
        console.log(`error accured in service ${err}`);
       }
     };
}
export default new sessionService();