import { Router } from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
