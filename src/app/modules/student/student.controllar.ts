import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchemaZod from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // data validetion using zod
    const student = req.body.student;
    const zodParseData = studentValidationSchemaZod.parse(student);
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err?.message || 'Something is wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err?.message || 'Something is wrong',
      error: err,
    });
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
  } catch (err: any) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err?.message || 'Something is wrong',
      error: err,
    });
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
  } catch (err: any) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err?.message || 'Something is wrong',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getAStudent,
  deleteAStudent,
};
