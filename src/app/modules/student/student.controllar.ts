import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err?.message || 'Something is wrong',
        error: err,
      });
    }
  }
};

const getAStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getAStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err?.message || 'Something is wrong',
        error: err,
      });
    }
  }
};

const deleteAStudent = async (req: Request, res: Response) => {
  try {
    const rollNumber = req.params.rollNumber;
    const result = await StudentServices.deleteAStudentFromDB(rollNumber);
    res.status(200).json({
      success: true,
      message: 'Student is Deleted succesfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      res.status(200).json({
        success: false,
        message: err?.message || 'Something is wrong',
        error: err,
      });
    }
  }
};

export const StudentController = {
  getAllStudents,
  getAStudent,
  deleteAStudent,
};
