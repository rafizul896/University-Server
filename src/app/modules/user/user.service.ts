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

  //   set manually generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  const isUserExists = await Student.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This email Already Used on this Academy',
    );
  }
  //   create a user
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    // set id ,_id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // ref _id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
