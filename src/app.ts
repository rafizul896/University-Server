import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './app/modules/student/student.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('University server is running..!');
});

export default app;
