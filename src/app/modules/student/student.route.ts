import express from 'express';
import { StudentController } from './student.controllar';

const router = express.Router();

// will call controller func
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getAStudent);
router.delete('/:id', StudentController.deleteAStudent);

export const StudentRouters = router;
