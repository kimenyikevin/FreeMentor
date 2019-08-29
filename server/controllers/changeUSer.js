import user from "../models/usersModels/userModels";
const changeUser = {
  changeStatus(req, res) {
    const Status = user.findById(parseInt(req.params.id));
    if (!Status) {
      res.status(404).send({
        status: 404,
        error: "data not  found"
      });
    } else {
      const updatedStatus = user.update(req.params.id);
      if (updatedStatus == "user") {
        Status.status = "mentor";
        const { password, ...newUser } = Status;
        return res.status(200).send({
          status: 200,
          data: {
            message: "User account changed to mentor",
            ...newUser
          }
        });
      } else {
        return res.status(401).send({
          status: 401,
          error: "this user is a mentor"
        });
      }
    }
  }
};
export default changeUser;
