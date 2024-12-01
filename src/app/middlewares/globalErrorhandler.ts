import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof Error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCode = (err as any).status || 500;
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({
      success: false,
      error: err,
      message,
    });
    next(err);
  }
};

export default globalErrorHandler;
