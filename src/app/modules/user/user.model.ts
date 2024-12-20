import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

// pre save middleware/hook : will work on create() or save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data ');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set(sand) '' after saving password
userSchema.post('save', function (document, next) {
  document.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
