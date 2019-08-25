import sessionModel from '../models/sessionModels';
import jwt from "jsonwebtoken";
class inputSession {
        fillSession(req, res) {
          jwt.verify(req.token, process.env.SECRET_KEY, (err, { id, email}) => {
            if (err) {
              return res.status(401).send({
                status: 401,
                error: "you do not have access to this service (invalid token)"
              });
            }
            const createSession = sessionModel.create(req.body,id,email)
              return res.status(200).send({
                status: 200,
                data: 
                       createSession
              });
          });
      }
}
export default new inputSession();
