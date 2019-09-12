import allMentors from '../services/mentors';
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
    return res.status(500).send({
      status: 500,
      error: `something went wrong  ${error} `
    });
  }
}
getOne = async (req, res) => {
  try {
    const newMentor = await allMentors.getOneService(req.params.id);
    if (!newMentor) {
      return res.status(403).send({
        status: 403,
        error: "user you try to access is not mentor"
      });
    }
    return res.status(200).send({
      status: 200,
      data: newMentor
   });
  } catch(error) {
    return res.status(404).send({
      status: 404,
      error: "user you try to access is not found"
    });
  }
}
}
export default new vMentors();