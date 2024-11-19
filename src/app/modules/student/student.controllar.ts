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
  } catch (err) {
    console.log(err);

    res.status(200).json({
      success: false,
      data: err,
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getAStudent,
};
