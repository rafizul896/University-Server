import express from 'express';
import { StudentController } from './student.controllar';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// will call controller func
router.get('/',auth(USER_ROLE.student), StudentController.getAllStudents);
router.get('/:studentId', StudentController.getAStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRouters = router;
