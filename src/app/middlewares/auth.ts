import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsynce';
import httpStatus from 'http-status';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
    }

    next();
  });
};

export default auth;
