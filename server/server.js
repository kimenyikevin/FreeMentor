// server.js
import express from "express";
import bodyParser from 'body-parser';
import users from "./routes/usersRoutes";
import errorHandler from "./middleware/error.handler"
const app = express();
app.use(express.json());

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port);

app.use("/api/v1/auth", users);
console.log("app running on port ", port);
