import express from 'express';
import { StudentController } from './student.controllar';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// will call controller func
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getAStudent);
router.patch('/:studentId',validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRouters = router;
