import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(AuthValidations.loginValidationSchema));

export const AuthRoutes = router;
