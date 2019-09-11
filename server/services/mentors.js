import db from '../models/userModels';
class changeService{
    getAllService = async () => {
        const findAll = 'SELECT * FROM users where status = $1';
        try {
          const { rows } = await db.execute(findAll, ['mentor']);
          if(rows.length == 0){
              return undefined;
          }
          const newMentors = rows.map(mentor => {
            const {password, ...mentorInfo} = mentor;
            return mentorInfo;
        });
        return newMentors;
        } catch(error) {
          return console.log(`error accured in service ${error}`);
        }
      }
      getOneService = async (id) => {
        const text = 'SELECT * FROM users WHERE id = $1 AND status = $2';
        try {
          const { rows } = await db.execute(text, [id, 'mentor']);
          if (!rows[0]) {
            return undefined;
          }
          const { password, ...newMentor } = rows[0];
          return newMentor;
        } catch(error) {
          return console.log(`error accured in service ${error}`);
        }
      }

}
export default new changeService();


