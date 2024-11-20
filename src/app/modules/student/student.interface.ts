import { Model } from 'mongoose';

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
  rollNumber: string;
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
  isActive: 'active' | 'blocked';
};

// for crating static
export interface StudentModel extends Model<IStudent>{
  isUserExists(rollNumber:string): Promise<IStudent | null>
}


// for creating instance
// export type StudentMethod = {
//   isUserExists(rollNumber: string): Promise<IStudent | null>;
// };

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   StudentMethod
// >;
