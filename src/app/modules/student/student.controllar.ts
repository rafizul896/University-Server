import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getAStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getAStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

const deleteAStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.deleteAStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Deleted succesfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

export const StudentController = {
  getAllStudents,
  getAStudent,
  deleteAStudent,
};
