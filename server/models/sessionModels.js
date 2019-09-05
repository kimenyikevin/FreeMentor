class session {
  constructor() {
    this.Session = [];
  }
  create(data,id,email) {
    let sessionid = this.Session.length + 1;
    const newSession = {
      Sessionid: sessionid,
      mentorId: data.mentorId || "",
      menteeId: id,
      questions: data.questions || "",
      menteeEmail: email,
      status: data.status || "pending"
    };
    this.Session.push(newSession);
    return newSession;
  }
  findById(id) {
    return this.Session.find(found => found.Sessionid == id);
  }
}
export default new session();
