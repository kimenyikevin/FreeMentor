import allMentors from '../models/usersModels/userModels';
class vMentors{
    get(req, res){
        const mentors = allMentors.findAll();
        return res.status(200).send({
           status: 200,
           data: 
             mentors
        });
    }
    getOne(req, res){
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