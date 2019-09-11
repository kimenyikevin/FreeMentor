import service from '../services/session'
import 'idempotent-babel-polyfill';
import moment from 'moment';
class inputSession {
  fillSession = async (req, res) => {
    try {
      const { mentorid, questions} = req.body;
      const {id,email} = req.currentUser;
      const value = [
           mentorid, id, questions, email, moment(new Date()), moment(new Date())
      ];
       const newSession = await service.createSession(value);
       if(!newSession){
        return res.status(404).send({
          status: 404,
          error: `user with this id is not found`
        });
       }
       if(newSession == false){
        return res.status(401).send({
          status: 401,
          error: `user you trying to request is not mentor`
        });
       }
       if(newSession == true ){
        return res.status(409).send({
          status: 409,
          error: `you can not request mentorship twice`
        });
       }
        return res.status(201).send({
          status: 201,
          message: "session created successful",
          data: newSession
        });
    } catch (error) {
      console.log(`error ${error}`)
      return res.status(403).send({
        status: 403,
        error: `you do not have access to this service ${error}`
      });
    }
  }
}
export default new inputSession();
