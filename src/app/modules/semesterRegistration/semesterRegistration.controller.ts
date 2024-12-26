import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully!',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
};
