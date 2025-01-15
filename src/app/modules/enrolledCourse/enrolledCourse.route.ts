import express from 'express';

const router = express.Router();

router.post('/create-enrolled-course');

router.get('/my-enrolled-courses');

router.patch('/update-enrolled-course-marks');

export const EnrolledCourseRoutes = router;
