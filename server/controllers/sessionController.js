import sessionModel from "../models/sessionModels";
class inputSession {
  fillSession = (req, res) => {
    try {
        const {id,email} = req.currentUser;
        const createSession = sessionModel.create(req.body, id, email);
        return res.status(200).send({
          status: 200,
          message: "session created successful",
          data: {
            createSession
          }
        });
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: "you do not have access to this service (invalid token)"
      });
    }
  }
  accept = (req, res) => {
    if(isNaN(req.params.sessionId)){
      return res.status(401).send({
        status: 401,
        error: 'id must be a number',
      });
    }
    const session = sessionModel.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).send({
        status: 404,
        error: "id you try to access is not found"
      });
    }
      session.status = "accept";
      return res.status(200).send({
        status: 200,
        data: {
          ...session
        }
      });
  }
  reject = (req, res) => {
    if(isNaN(req.params.sessionId)){
      return res.status(401).send({
        status: 401,
        error: 'id must be a number',
      });
    }
    const session = sessionModel.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).send({
        status: 404,
        error: "id you try to access is not found"
      });
    }
      session.status = "reject";
      return res.status(200).send({
        status: 200,
        data: {
          ...session
        }
      });
  }
}
export default new inputSession();
