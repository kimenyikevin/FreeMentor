import service from '../services/session'
import 'idempotent-babel-polyfill';
class inputSession {
  fillSession = async (req, res) => {
    try {
      const { mentorid, questions} = req.body;
      const {id,email} = req.currentUser;
      const value = [
           mentorid, id, questions, email 
      ];
       const newSession = await service.createSession(value);
       if(!newSession){
        return res.status(404).send({
          status: 404,
          error: `user with this id is not found or check if your are passing correct data`
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
  accept = async (req, res) => {
    const values = [
      'accept',
      req.params.sessionId, 
    ];
    const acceptT = await service.acceptService(req.params.sessionId, values);
    if(acceptT == undefined){
      return res.status(404).send({
        status: 404,
        error: "this session does not exist"
      });
    }
    if( acceptT == false ){
      return res.status(409).send({
        status: 409,
        error: `you can not accept request twice`
      });
     }
    return res.status(201).send({
       status: 201,
       data: acceptT
    });

  }
  reject = async (req, res) => {
    const values = [
      'reject',
      req.params.sessionId, 
    ];
    const rejectT = await service.acceptService(req.params.sessionId, values);
    if(rejectT == undefined){
      return res.status(404).send({
        status: 404,
        error: "this session does not exist"
      });
    }
    if( rejectT == true ){
      return res.status(409).send({
        status: 409,
        error: `you can not reject request twice`
      });
     }
     if( rejectT == false ){
      return res.status(409).send({
        status: 409,
        error: `you can not reject request after accepting it`
      });
     }
    return res.status(201).send({
       status: 201,
       data: rejectT
    });
  }
}
export default new inputSession();
