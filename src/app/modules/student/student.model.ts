import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  IStudent,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: [2, 'First Name must be at least 2 characters long'],
    maxlength: [50, 'First Name cannot exceed 50 characters'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    minlength: [2, 'Last Name must be at least 2 characters long'],
    maxlength: [50, 'Last Name cannot exceed 50 characters'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
    match: [/^\d{11}$|^\d{14}$/, "Father's Contact Number must be 11 or 14 digits"],
  },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: {
    type: String,
    match: [/^\d{11}$|^\d{14}$/, "Mother's Contact Number must be 11 or 14 digits"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local Guardian's Name is required"] },
  occupation: { type: String, required: [true, "Local Guardian's Occupation is required"] },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required"],
    match: [/^\d{11}$|^\d{14}$/, "Local Guardian's Contact Number must be 11 or 14 digits"],
  },
  address: { type: String, required: [true, "Local Guardian's Address is required"] },
});

const studentSchema = new Schema<IStudent>({
  rollNumber: {
    type: String,
    required: [true, 'Roll Number is required'],
    unique: true,
    match: [/^\d{4,10}$/, 'Roll Number must be between 4 and 10 digits'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender field is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of Birth is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must follow the format YYYY-MM-DD'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Email must be a valid email address'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required'],
    match: [/^\d{11}$|^\d{14}$/, 'Contact Number must be 11 or 14 digits'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
    match: [/^\d{11}$|^\d{14}$/, 'Emergency Contact Number must be 11 or 14 digits'],
  },
  blodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
    minlength: [10, 'Present Address must be at least 10 characters long'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
    minlength: [10, 'Permanent Address must be at least 10 characters long'],
  },
  profileImg: {
    type: String,
    match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, 'Profile Image must be a valid URL'],
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status',
    },
    default: 'active',
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required'],
  },
});

export const Student = model<IStudent>('Student', studentSchema);
