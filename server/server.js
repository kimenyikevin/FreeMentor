// server.js
import express from "express";
import user from "./controllers/usersController";
import users from "./routes/usersRoutes";
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   return res.status(200).send({'message': '' });
// })

const port = process.env.PORT || 3000;
app.listen(port);

app.post("/api/v1/signup", user.create);
app.use("/api/users", users);
console.log("app running on port ", port);
