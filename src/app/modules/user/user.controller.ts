import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsynce';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student: studentData, password } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
