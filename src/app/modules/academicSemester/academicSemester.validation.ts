import { z } from 'zod';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summar', 'Fall'], {
      required_error: 'Semester name is required',
      invalid_type_error:
        "Semester name must be one of 'Autumn', 'Summar', or 'Fall'",
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Semester code is required',
      invalid_type_error: "Semester code must be one of '01', '02', or '03'",
    }),
    year: z
      .string({
        required_error: 'Year is required',
        invalid_type_error: 'Year must be a valid ISO date string',
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid year format. Must be a valid date string.',
      }),
    startMonth: z.enum(months, {
      required_error: 'Start month is required',
      invalid_type_error: 'Start month must be one of the valid months',
    }),
    endMonth: z.enum(months, {
      required_error: 'End month is required',
      invalid_type_error: 'End month must be one of the valid months',
    }),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
