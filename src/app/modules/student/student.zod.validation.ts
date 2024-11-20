import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' })
    .max(50, { message: 'First Name cannot exceed 50 characters' })
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name must start with an uppercase letter',
    }),
  middleName: z.string().optional().default(''),
  lastName: z
    .string()
    .min(2, { message: 'Last Name must be at least 2 characters long' })
    .max(50, { message: 'Last Name cannot exceed 50 characters' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name can only contain alphabetic characters',
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's Name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's Occupation is required" }),
  fatherContactNo: z.string().regex(/^\d{11}$|^\d{14}$/, {
    message: "Father's Contact Number must be 11 or 14 digits",
  }),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z
    .string()
    .regex(/^\d{11}$|^\d{14}$/, {
      message: "Mother's Contact Number must be 11 or 14 digits",
    })
    .optional(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local Guardian's Name is required" }),
  occupation: z
    .string()
    .nonempty({ message: "Local Guardian's Occupation is required" }),
  contactNo: z.string().regex(/^\d{11}$|^\d{14}$/, {
    message: "Local Guardian's Contact Number must be 11 or 14 digits",
  }),
  address: z
    .string()
    .nonempty({ message: "Local Guardian's Address is required" }),
});

// Main Student Schema
const studentValidationSchemaZod = z.object({
  rollNumber: z.string().regex(/^\d{4,10}$/, {
    message: 'Roll Number must be between 4 and 10 digits',
  }),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others'], {
    errorMap: () => ({
      message: 'Gender must be either male, female, or others',
    }),
  }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of Birth must follow the format YYYY-MM-DD',
  }),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  contactNo: z.string().regex(/^\d{11}$|^\d{14}$/, {
    message: 'Contact Number must be 11 or 14 digits',
  }),
  emergencyContactNo: z.string().regex(/^\d{11}$|^\d{14}$/, {
    message: 'Emergency Contact Number must be 11 or 14 digits',
  }),
  blodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),
  presentAddress: z.string().min(10, {
    message: 'Present Address must be at least 10 characters long',
  }),
  permanentAddress: z.string().min(10, {
    message: 'Permanent Address must be at least 10 characters long',
  }),
  profileImg: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message: 'Profile Image must be a valid URL',
    })
    .optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'Status must be either active or blocked' }),
    })
    .optional()
    .default('active'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  isDeleted: z.boolean()
});

// Exporting the validation schema
export default studentValidationSchemaZod;
