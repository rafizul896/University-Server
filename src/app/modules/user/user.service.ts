import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Admin } from '../admin/admin.model';
import { USER_ROLE } from './user.constant';
import { JwtPayload } from 'jsonwebtoken';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a use object
  const userData: Partial<TUser> = {};

  // if password is not given then use default password
  userData.password = password || (config.default_password as string);

  //   set student role & email
  userData.role = 'student';
  userData.email = payload.email;

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
  } catch (err: unknown) {
    await session.abortTransaction();
    await session.endSession();
    if (err instanceof Error) {
      throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role & email
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    if (err instanceof Error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err.message);
    }
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set admin role & email
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    if (err instanceof Error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err.message);
    }
  }
};

const getMe = async (payload: JwtPayload) => {
  const { userId, role } = payload;
  let result;

  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id: userId }).populate('user');
  }

  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
