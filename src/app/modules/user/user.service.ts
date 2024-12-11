import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a use object
  const userData: Partial<TUser> = {};

  // if password is not given then use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'student';

  // find acamdemic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   set manually generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    const isUserExists = await Student.findOne({ email: payload.email });
    if (isUserExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This email Already Used on this Academy',
      );
    }
    //   create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    } else {
      // set id ,_id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // ref _id

      //   create a student (transaction-2)
      const newStudent = await Student.create([payload], { session });

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
      }

      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
