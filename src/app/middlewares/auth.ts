import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsynce';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = () => {
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

      req.user = decoded as JwtPayload;
    });

    next();
  });
};

export default auth;
