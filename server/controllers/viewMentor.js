import allMentors from '../models/userModels';
import db from '../models/userModels';
class vMentors{
    get = (req, res)=>{
        const mentors = allMentors.findAll();
       const data = mentors.map(mentor => {
            const {password, ...mentorInfo} = mentor;
            return mentorInfo;
        });
        return res.status(200).send({
           status: 200,
           data,
        });
    }
    getOne = (req, res) => {
        if(isNaN(req.params.id)){
            return res.status(401).send({
              status: 401,
              error: 'id must be a number',
            });
          }
        const { id } = req.params;
        const mentor = allMentors.findById(parseInt(id));
        if(!mentor){
            return res.status(404).send({
                status: 404,
                error: "mentors does not exist"
              });
        }
        if(mentor.id == id && mentor.status === "mentor"){
            const { password, ...newMentor } = mentor;
            return res.status(200).send({
                status: 200,
                data: 
                newMentor
             });
        }
        return res.status(404).send({
            status: 404,
            error: "user you try to access is not mentor"
          });
    }
}
export default new vMentors();