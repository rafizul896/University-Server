import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRouters);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('University server is running..!');
});

app.use(globalErrorHandler);

export default app;
