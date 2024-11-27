import { User } from './user.model';

const createStudentIntoDB = async (studentData) => {
  //   if (await Student.isUserExists(studentData.rollNumber)) {
  //     throw new Error('User already Exists!');
  //   }

  const result = await User.create(studentData);
  return result;
};

export const UserService = {
  createStudentIntoDB,
};
