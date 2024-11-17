import express from 'express';
import { StudentController } from './student.controllar';

const router = express.Router();

// will call controller func
router.post('/create-student', StudentController.createStudent);

export const StudentRouters = router;
