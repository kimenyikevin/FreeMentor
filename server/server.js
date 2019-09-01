// server.js
import express from "express";
import users from "./routes/usersRoutes";
import mentors from "./routes/mentorsroutes";
import sessions from "./routes/sessionsRoutes";
import errorHandler from "./middleware/error.handler";
import swaggerui from 'swagger-ui-express';
import swaggerdocs from './swagger.json';
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));
app.use(errorHandler);
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port);

app.use("/api/v1/auth", users);
app.use("/api/v1/auth", mentors);
app.use("/api/v1/auth", sessions);

console.log("app running on port ", port);

export default app;
