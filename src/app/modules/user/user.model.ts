import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      message: 'Role must be one of "admin", "student", or "faculty".',
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      message: 'Status must be either "in-progress" or "blocked".',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
