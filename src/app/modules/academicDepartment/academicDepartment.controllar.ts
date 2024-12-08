import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acaemic Department created succesfully',
    data: result,
  });
});



export const AcademicDepartmentControllers = {
  createAcademicDepartment,
};
