import user from "../models/usersModels/userModels";
const changeUser = {
  changeStatus(req, res) {
    let Status = user.findOne(parseInt(req.params.id));
    if (!Status) {
      res.status(201).send({
        status: 201,
        message: "data not  found"
      });
    } else {
      const updatedStatus = user.update(req.params.id);
      if (updatedStatus == "user") {
        Status.status = "mentor";
        return res.status(200).send({
          status: 200,
          data: {
            message: "User account changed to mentor",
            ...Status
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
