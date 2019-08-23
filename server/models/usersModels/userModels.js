import moment from "moment";
import uuid from "uuid";
class User {
  constructor() {
    this.User = [
      {
        id: uuid.v4(),
        firstName: "kimenyi",
        lastName: "kevin",
        email: "kimenyikevin@gmail.com",
        password: "kigali",
        address: "kigali",
        bio: "engineer",
        status: "mentor",
        occupation: "engineer",
        expertise: "engineer"
      },
      {
        id: uuid.v4(),
        firstName: "habimana",
        lastName: "emmy",
        email: "habimanaemmy@gmail.com",
        password: "kigali",
        address: "kigali",
        bio: "engineer",
        status: "user",
        occupation: "engineer",
        expertise: "engineer"
      },
      {
        id: uuid.v4(),
        firstName: "kwizera",
        lastName: "eric",
        email: "kwizeraeric@gmail.com",
        password: "kigali",
        address: "kigali",
        bio: "engineer",
        status: "admin",
        occupation: "engineer",
        expertise: "engineer"
      }
    ];
  }
  create(data) {
    // let userid = this.User.length + 1;
    const newUser = {
      id: uuid.v4(),
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      password: data.password || "",
      address: data.address || "",
      bio: data.bio || "",
      status: data.status || "",
      occupation: data.occupation || "",
      expertise: data.expertise || "",
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.User.push(newUser);
    return newUser;
  }
  find(email) {
    return this.User.find(found => found.email === email);
  }
}
export default new User();
