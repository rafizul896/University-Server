import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty")
      .max(255, "Name cannot exceed 255 characters"),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty")
      .max(255, "Name cannot exceed 255 characters"),
  }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema
};
