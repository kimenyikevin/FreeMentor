import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
class usefulData {
    constructor(){
        this.data=
            {
    userdata: {
               firstName: "bavakure",
               lastName: "eric",
               email: "kimenyik@gmail.com",
               password: "kigali",
               address: "kigali",
               bio: "engineer",
               occupation: "engineer",
               expertise: "engineer",
             },
    otherdata:    {
               firstName: "bavakure",
               lastName: "",
               email:" kimenyik.com",
               password: "ki",
               address: "kigali",
               bio: "engineer",
               occupation: "engineer",
               expertise: "engineer"
              },
    signIn:    {
           email:" @gmail.com",
           password: "kigali"
             },
    signInWrongData:    {
           email: "habimanaemmy@gmail.com", 
           password: ""
       },
    createSession : {
        mentorId: 3,
        questions: "i need help"
      }
    }
    }
mochData = () => {
    const invaldToken = jwt.sign(
            { id: 0, userType: 'user', email: '@gmail.com' },
            process.env.SECRET_KEY
          );
          return invaldToken;
}
mochDataNotExist = () => {
    let notExistUserToken = jwt.sign(
        { id: 0, userType: 'user', email: 'habimanaemmy@gmail.com' },
        process.env.SECRET_KEY
      );
      return notExistUserToken;
}
mochDataRealToken = () => {
    let realToken = jwt.sign(
        { id: 2, userType: 'user', email: 'habimanaemmy@gmail.com' },
        process.env.SECRET_KEY
      );
      return realToken;
}
mochDataRealMentor = () => {
    let realMentor = jwt.sign(
        { id: 1, userType: 'mentor', email: 'kimenyikevin@gmail.com' },
        process.env.SECRET_KEY
      );
      return realMentor;
}
mochDataRealAdmin = () => {
    let realAdmin = jwt.sign(
        { id: 3, userType: 'admin', email: 'kwizeraeric@gmail.com' },
        process.env.SECRET_KEY
      );
      return realAdmin;
}
}
export default new usefulData ();