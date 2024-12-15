import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponce } from '../interface/error';

const handleCastError = (err: Error.CastError): TGenericErrorResponce => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleCastError;
