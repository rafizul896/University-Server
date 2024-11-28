import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  // create a use object
  const userData: Partial<TUser> = {};

  // if password is not given then use default password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = 'student';

  //   set manually generated id
  userData.id = '203010001';

  //   create a user
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    // set id ,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // ref _id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
