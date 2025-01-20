import { Router } from 'express';
import { AcademicFacultyControllars } from './academicFaculty.controllar';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllars.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllars.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllars.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllars.updateAcademicFacuty,
);

export const AcademicFacultyRoutes = router;
