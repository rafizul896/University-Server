import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created succesfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});

export const AcademicFacultyControllars = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
