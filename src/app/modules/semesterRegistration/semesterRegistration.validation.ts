import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

// Schema for create
const createSemesterRegistrationSchema = z.object({
  body: z.object({
    academicSemester: z.string().refine((id) => /^[a-fA-F0-9]{24}$/.test(id), {
      message: 'Invalid ObjectId format for academicSemester',
    }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.preprocess(
      (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
      z.date(),
    ),
    endDate: z.preprocess(
      (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
      z.date(),
    ),
    minCredit: z
      .number()
      .int()
      .min(0, { message: 'Minimum credit must be at least 0' }),
    maxCredit: z
      .number()
      .int()
      .min(0, { message: 'Maximum credit must be at least 0' }),
  }),
});

// Schema for update
const updateSemesterRegistrationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .refine((id) => /^[a-fA-F0-9]{24}$/.test(id), {
        message: 'Invalid ObjectId format for academicSemester',
      })
      .optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z
      .preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
      )
      .optional(),
    endDate: z
      .preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
      )
      .optional(),
    minCredit: z
      .number()
      .int()
      .min(0, { message: 'Minimum credit must be at least 0' })
      .optional(),
    maxCredit: z
      .number()
      .int()
      .min(0, { message: 'Maximum credit must be at least 0' })
      .optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationSchema,
  updateSemesterRegistrationSchema,
};
