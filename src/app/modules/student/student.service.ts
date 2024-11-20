import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData.rollNumber)) {
    throw new Error('User already Exists!');
  }

  const result = await Student.create(studentData); // build in static method

  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.rollNumber)) {
  //   throw new Error('User already Exists!');
  // }
  // const result = await student.save(); // build in instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ rollNumber: id });
  const result = await Student.aggregate([{ $match: { rollNumber: id } }]);
  return result;
};

const deleteAStudentFromDB = async (rollNumber: string) => {
  const result = await Student.updateOne({ rollNumber }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
