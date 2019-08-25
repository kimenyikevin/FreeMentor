class session {
  constructor() {
    this.Session = [
      {
        Sessionid: 1,
        mentorId: 1,
        menteeId: 2,
        questions: "i need help",
        menteeEmail: "kimenyikevin@gmail.com",
        status: "pending",
      },
      {
        Sessionid: 2,
        mentorId: 3,
        menteeId: 1,
        questions: "i need help",
        menteeEmail: "kimenyikevin@gmail.com",
        status: "pending",
      },
      {
        Sessionid: 3,
        mentorId: 4,
        menteeId: 2,
        questions: "i need help",
        menteeEmail: "kimenyikevin@gmail.com",
        status: "pending",
      },
      {
        Sessionid: 4,
        mentorId: 5,
        menteeId: 3,
        questions: "i need help",
        menteeEmail: "kimenyikevin@gmail.com",
        status: "pending",
      }
    ];
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
}
export default new session();
