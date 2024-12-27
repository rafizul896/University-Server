import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ id: payload?.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = isUserExists?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = isUserExists?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );
  
  console.log(isPasswordMatched);
};

export const AuthServices = {
  loginUser,
};
