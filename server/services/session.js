import db from '../models/userModels'

class sessionService {
   createSession = async (values) => {
       const text = `INSERT INTO  sessions ( mentorid, menteeid, questions, menteeemail)
       VALUES ($1, $2, $3, $4)
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
     acceptService = async (sessionId, values) => {
      const findOne = 'SELECT * FROM sessions WHERE sessionid=$1';
      const updateOne =`UPDATE sessions
        SET status=$1
        WHERE sessionid=$2 returning *`;
      try {
        if(isNaN(sessionId)){
          return undefined;
        }
        const { rows } = await db.execute(findOne, [sessionId] );
        if(rows == ''){
          return undefined;
        }
        const statusType = rows[0].status;
        if(statusType == 'accept'){
            return false;
        }
        if(statusType == 'reject'){
          return true;
      }
        const newstatus = await db.execute(updateOne, values);
        const updatedSession = newstatus.rows[0];
        return updatedSession;
      } catch(err) {
       console.log(`error accured in service ${err}`);
      }
    };
}
export default new sessionService();