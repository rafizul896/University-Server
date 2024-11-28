import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post('/create-user', UserControllers.createStudent);

export const UserRoutes = router;
