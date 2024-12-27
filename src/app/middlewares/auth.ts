import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsynce';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
    }

    // check if the token is valid
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
      }

      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
      }

      req.user = decoded as JwtPayload;
    });

    next();
  });
};

export default auth;
