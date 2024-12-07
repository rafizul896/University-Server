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
router.get('/:semesterId', AcademicFacultyControllars.getSingleAcademicFaculty);
router.patch('/:semesterId', AcademicFacultyControllars.updateAcademicFacuty);

export const AcademicFacultyRouter = router;
