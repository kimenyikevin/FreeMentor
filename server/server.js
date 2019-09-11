// server.js
import express from 'express';
import swaggerui from 'swagger-ui-express';
import users from './routes/usersRoutes';
import mentors from './routes/mentorsroutes';
import sessions from './routes/sessionsRoutes';
import errorHandler from './middleware/error.handler';
import swaggerdocs from './swagger.json';
import './models/userModels';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port);

app.use('/api/v2/auth', sessions);
app.use('/api/v2/auth', users);
app.use('/api/v2/auth', mentors);

app.use('/', (req, res) => {
  res.status(405).send({
    status: 405,
    error: 'please specify method of router',
  });
});

console.log('app running on port ', port);

export default app;
