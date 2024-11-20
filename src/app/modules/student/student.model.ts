import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  IStudent,
  UserName,
  StudentModel,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<IStudent, StudentModel>({
  rollNumber: { type: String, unique: true },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  blodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (rollNumber: string) {
  const existingUser = await Student.findOne({ rollNumber });
  return existingUser;
};

// // creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ rollNumber: id });
//   return existingUser;
// };

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
