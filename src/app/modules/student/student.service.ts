import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteAStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
