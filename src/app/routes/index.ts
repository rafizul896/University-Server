import { Router } from 'express';
import { StudentRouters } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/students',
    route: StudentRouters
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.use('/users', UserRoutes);
router.use('/students', StudentRouters);

export default router;
