import { Model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName?: string;
  motherOccupation?: string;
  motherContactNo?: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: UserName;
  profileImg?: string;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  blodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

// for crating static
export interface StudentModel extends Model<IStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IStudent | null>;
};