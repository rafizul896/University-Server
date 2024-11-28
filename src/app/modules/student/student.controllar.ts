import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
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
    res.status(200).json({
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
    const rollNumber = req.params.rollNumber;
    const result = await StudentServices.deleteAStudentFromDB(rollNumber);
    res.status(200).json({
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
