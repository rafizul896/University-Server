import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'First name is required' })
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, { message: 'First name must not exceed 50 characters' }),
  middleName: z
    .string()
    .max(50, { message: 'Middle name must not exceed 50 characters' })
    .optional(),
  lastName: z
    .string()
    .nonempty({ message: 'Last name is required' })
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(50, { message: 'Last name must not exceed 50 characters' }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty({ message: "Father's name is required" })
    .max(100, { message: "Father's name must not exceed 100 characters" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" })
    .max(100, { message: 'Occupation must not exceed 100 characters' }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required" })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Father's contact number must be a valid phone number",
    }),
  motherName: z
    .string()
    .max(100, { message: "Mother's name must not exceed 100 characters" })
    .optional(),
  motherOccupation: z
    .string()
    .max(100, { message: 'Occupation must not exceed 100 characters' })
    .optional(),
  motherContactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Mother's contact number must be a valid phone number",
    })
    .optional(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Local guardian's name is required" })
    .max(100, { message: 'Name must not exceed 100 characters' }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required" })
    .max(100, { message: 'Occupation must not exceed 100 characters' }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required" })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: 'Contact number must be a valid phone number',
    }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required" })
    .min(10, { message: 'Address must be at least 10 characters long' })
    .max(200, { message: 'Address must not exceed 200 characters' }),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        message: "Gender must be either 'male' or 'female'",
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .nonempty({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
      contactNo: z
        .string()
        .nonempty({ message: 'Contact number is required' })
        .regex(/^\+?[0-9]{10,15}$/, {
          message: 'Contact number must be a valid phone number',
        }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: 'Emergency contact number is required' })
        .regex(/^\+?[0-9]{10,15}$/, {
          message: 'Emergency contact number must be a valid phone number',
        }),
      blodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        message: 'Blood group must be a valid type',
      }),
      presentAddress: z
        .string()
        .nonempty({ message: 'Present address is required' })
        .min(10, { message: 'Address must be at least 10 characters long' })
        .max(200, { message: 'Address must not exceed 200 characters' }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent address is required' })
        .min(10, { message: 'Address must be at least 10 characters long' })
        .max(200, { message: 'Address must not exceed 200 characters' }),
      // profileImg: z
      //   .string()
      //   .url({ message: 'Profile image must be a valid URL' })
      //   .optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// Update Student Validation Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: userNameValidationSchema.partial(), // All name fields optional
        gender: z
          .enum(['male', 'female'], {
            message: "Gender must be either 'male' or 'female'",
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email({ message: 'Invalid email address' })
          .optional(),
        contactNo: z
          .string()
          .regex(/^\+?[0-9]{10,15}$/, {
            message: 'Contact number must be a valid phone number',
          })
          .optional(),
        emergencyContactNo: z
          .string()
          .regex(/^\+?[0-9]{10,15}$/, {
            message: 'Emergency contact number must be a valid phone number',
          })
          .optional(),
        blodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
            message: 'Blood group must be a valid type',
          })
          .optional(),
        presentAddress: z
          .string()
          .min(10, { message: 'Address must be at least 10 characters long' })
          .max(200, { message: 'Address must not exceed 200 characters' })
          .optional(),
        permanentAddress: z
          .string()
          .min(10, { message: 'Address must be at least 10 characters long' })
          .max(200, { message: 'Address must not exceed 200 characters' })
          .optional(),
        profileImg: z
          .string()
          .url({ message: 'Profile image must be a valid URL' })
          .optional(),
        guardian: guardianValidationSchema.partial(), // All guardian fields optional
        localGuardian: localGuardianValidationSchema.partial(), // All local guardian fields optional
        admissionSemester: z.string().optional(),
        isDeleted: z.boolean().optional(),
      })
      .partial()
      .optional(),
  }),
});

// Exporting the validation schema
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
