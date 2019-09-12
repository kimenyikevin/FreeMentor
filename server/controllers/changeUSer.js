import change from '../services/change';


class changeUser {
   update = async (req, res) => {
    try {
      const newMentor = await change.service(req.params.id);
      if( newMentor == undefined ){
        return res.status(400).send({
          status: 400,
          error: 'id must be a number',
        });
      }
      if(newMentor == false) {
        return res.status(409).send({
          status: 409,
          error: 'this user is a mentor',
        });
      }
      return res.status(200).send({
           status: 200,
           message: 'user account changed to mentor'
      });
    } catch(err) {
      res.status(404).send({
        status: 404,
        error: 'id you are trying to find is not found',
      });
    }
  };
}
export default new changeUser();
