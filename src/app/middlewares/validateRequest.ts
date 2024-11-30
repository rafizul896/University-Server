import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // data validetion using zod
      await schema.parseAsync({ body: req.body });
      // if everything is allrignt then --> next()
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
