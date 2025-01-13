import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not Matched!');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expipes_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expipes_in as string,
  );

  await sendImageToCloudinary()

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.isUserExistsByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.oldPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not Matched!');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (
    user.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authroized');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expipes_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (!user.email) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Exists!');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '50m',
  );

  const resetUiLink = `${config.reset_password_uilink}?id=${user.id}&token=${resetToken}`;
  await sendEmail(user.email, resetUiLink);
};

const resetPassword = async (
  token: string,
  payload: { id: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
  }

  // checking if the user already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted!');
  }

  // checking if the user already blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (!user.email) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Exists!');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are Forbidden');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
