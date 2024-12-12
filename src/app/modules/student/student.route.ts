import express from 'express';
import { StudentController } from './student.controllar';

const router = express.Router();

// will call controller func
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getAStudent);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRouters = router;
