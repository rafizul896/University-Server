import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isdeleted: z.boolean().optional().default(false),
});

// Zod schema for creating a course
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .nonempty('Title is required')
      .max(255, 'Title must be less than 255 characters'),
    prefix: z.string().trim().nonempty('Prefix is required'),
    code: z
      .number()
      .int('Code must be an integer')
      .positive('Code must be positive'),
    credits: z
      .number()
      .int('Credits must be an integer')
      .positive('Credits must be positive'),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema),
  }),
});

// Zod schema for updating a course
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .nonempty('Title is required')
      .max(255, 'Title must be less than 255 characters')
      .optional(),
    prefix: z.string().trim().nonempty('Prefix is required').optional(),
    code: z
      .number()
      .int('Code must be an integer')
      .positive('Code must be positive')
      .optional(),
    credits: z
      .number()
      .int('Credits must be an integer')
      .positive('Credits must be positive')
      .optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
