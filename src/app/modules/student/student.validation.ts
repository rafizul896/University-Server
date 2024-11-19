import Joi from 'joi';

// UserName Schema
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.pattern.base': 'First Name must start with an uppercase letter',
      'string.min': 'First Name must be at least 2 characters long',
      'string.max': 'First Name cannot exceed 50 characters',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Last Name can only contain alphabetic characters',
      'string.min': 'Last Name must be at least 2 characters long',
      'string.max': 'Last Name cannot exceed 50 characters',
      'any.required': 'Last Name is required',
    }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': "Father's Occupation is required",
  }),
  fatherContactNo: Joi.string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .required()
    .messages({
      'string.pattern.base': "Father's Contact Number must be 11 or 14 digits",
      'any.required': "Father's Contact Number is required",
    }),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .optional()
    .messages({
      'string.pattern.base': "Mother's Contact Number must be 11 or 14 digits",
    }),
});

// Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "Local Guardian's Name is required",
  }),
  occupation: Joi.string().required().messages({
    'any.required': "Local Guardian's Occupation is required",
  }),
  contactNo: Joi.string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .required()
    .messages({
      'string.pattern.base':
        "Local Guardian's Contact Number must be 11 or 14 digits",
      'any.required': "Local Guardian's Contact Number is required",
    }),
  address: Joi.string().required().messages({
    'any.required': "Local Guardian's Address is required",
  }),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  rollNumber: Joi.string()
    .pattern(/^\d{4,10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Roll Number must be between 4 and 10 digits',
      'any.required': 'Roll Number is required',
    }),
  name: userNameSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender field is required',
  }),
  dateOfBirth: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Date of Birth must follow the format YYYY-MM-DD',
      'any.required': 'Date of Birth is required',
    }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact Number must be 11 or 14 digits',
      'any.required': 'Contact Number is required',
    }),
  emergencyContactNo: Joi.string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Emergency Contact Number must be 11 or 14 digits',
      'any.required': 'Emergency Contact Number is required',
    }),
  blodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().min(10).required().messages({
    'string.min': 'Present Address must be at least 10 characters long',
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().min(10).required().messages({
    'string.min': 'Permanent Address must be at least 10 characters long',
    'any.required': 'Permanent Address is required',
  }),
  profileImg: Joi.string()
    .pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/)
    .messages({
      'string.pattern.base': 'Profile Image must be a valid URL',
    }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
});

export default studentValidationSchema;