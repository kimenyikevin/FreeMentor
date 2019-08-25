import moment from "moment";
import uuid from "uuid";
class User {
  constructor() {
    this.User = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
        firstName: "kwizera",
        lastName: "eric",
        email: "kwizeraeric@gmail.com",
        password: "kigali",
        address: "kigali",
        bio: "engineer",
        status: "admin",
        occupation: "engineer",
        expertise: "engineer"
      },
      {
        id: 4,
        firstName: "bavakure",
        lastName: "eric",
        email: "kimenyike@gmail.com",
        password: "kigali",
        address: "kigali",
        bio: "engineer",
        status: "mentor",
        occupation: "engineer",
        expertise: "engineer"
      }
    ];
  }
  create(data) {
    let userid = this.User.length + 1;
    const newUser = {
      id: userid,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      password: data.password || "",
      address: data.address || "",
      bio: data.bio || "",
      status: data.status || "user",
      occupation: data.occupation || "",
      expertise: data.expertise || ""
    };
    this.User.push(newUser);
    return newUser;
  }
  findByEmail(email) {
    return this.User.find(found => found.email == email);
  }
  findById(id) {
    return this.User.find(found => found.id == id);
  }
  findAll() {
    return this.User.filter(found => found.status == "mentor");
  }
  update(id) {
    const reflection = this.findOne(id);
    const index = this.User.indexOf(reflection);
    return this.User[index].status;
  }
}
export default new User();
