import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynce';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const getAStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getAStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteAStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Deleted succesfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getAStudent,
  deleteAStudent,
};
