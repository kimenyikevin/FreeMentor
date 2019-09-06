import user from '../models/usersModels/userModels';

class changeUser {
 changeStatus = (req, res) => {
    if(isNaN(req.params.id)){
      return res.status(401).send({
        status: 401,
        error: 'id must be a number',
      });
    }
    const Status = user.findById(parseInt(req.params.id));
    try {
      const updatedStatus = user.update(req.params.id);
      if (updatedStatus == 'user') {
        Status.status = 'mentor';
        const { password, ...newUser } = Status;
        return res.status(200).send({
          status: 200,
          data: {
            message: 'User account changed to mentor',
            ...newUser,
          },
        });
      }
      return res.status(401).send({
        status: 401,
        error: 'this user is a mentor',
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        error: 'id you is not found in our data structure',
      });
    }
  };
}
export default new changeUser();
