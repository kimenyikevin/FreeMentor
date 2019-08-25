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
}
export default new vMentors();