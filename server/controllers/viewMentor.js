import allMentors from '../services/mentors';
import db from '../models/userModels';
class vMentors{
getAll = async (req, res) => {
  try {
  const newMentors = await allMentors.getAllService();
  if(newMentors == undefined){
    return res.status(404).send({
      status: 404,
        data: 'we do not found any mentors now'
   });
  }
    return res.status(200).send({
      status: 200,
        data: newMentors
   });
  } catch(error) {
    return res.status(400).send({
     error: ` ${error}    `
    });
  }
}
}
export default new vMentors();