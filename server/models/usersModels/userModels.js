class User {
  constructor() {
    this.User = [];
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
    const reflection = this.findById(id);
    const index = this.User.indexOf(reflection);
    return this.User[index].status;
  }
}
export default new User();
