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
  const { studentId } = req.params;
  const result = await StudentServices.getAStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId)
  const result = await StudentServices.deleteAStudentFromDB(studentId);

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
