import { Router } from 'express';
import { AcademicFacultyControllars } from './academicFaculty.controllar';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllars.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllars.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllars.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllars.updateAcademicFacuty,
);

export const AcademicFacultyRoutes = router;
