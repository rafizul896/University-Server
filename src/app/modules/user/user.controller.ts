import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // data validetion using zod
    const { student: studentData, password } = req.body;
    //   const zodParseData = studentValidationSchemaZod.parse(student);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
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

export const UserControllers = {
  createStudent,
};
