import { NextFunction, Request } from 'express';
import Joi from 'joi';
import { TaskStatus } from '../enums/task-status.enum';

type validateOptions = {
  abortEarly: boolean,
  allowUnknown: boolean,
  stripUnknown: boolean
}

function validateRequest(req: Request, next: NextFunction, schema: any) {
  const options: validateOptions = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: false,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errors = error.details.map(({ message, path }: { message: string, path: string[] }) => ({ message, field: path.join('.') }));
   ;
    const errObj = {
      status: 400,
      message: 'Validation Error',
      requestData: value,
      errors,
    };
    next(errObj);
  } else {
    req.body = value;
    next();
  }
}

const requiredStringValidation = Joi.string().trim().max(256).required();
const statusValidation = Joi.string().valid(...Object.values(TaskStatus)).required();

export {
    validateRequest,
    requiredStringValidation,
    statusValidation
}