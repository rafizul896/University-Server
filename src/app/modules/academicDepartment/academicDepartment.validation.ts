import { z } from 'zod';

// Create validation schema
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name cannot be empty')
      .max(255, 'Name cannot exceed 255 characters'),
    academicFaculty: z.string({
      required_error: 'AcademicFaculty is required',
      invalid_type_error: 'AcademicFaculty must be a valid ObjectId string',
    }),
  }),
});

// Update validation schema
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name cannot be empty')
      .max(255, 'Name cannot exceed 255 characters')
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'AcademicFaculty is required',
        invalid_type_error: 'AcademicFaculty must be a valid ObjectId string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
