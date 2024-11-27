import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { rollNumber: id } }]);
  return result;
};

const deleteAStudentFromDB = async (rollNumber: string) => {
  const result = await Student.updateOne({ rollNumber }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
