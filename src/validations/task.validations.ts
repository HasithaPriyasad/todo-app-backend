import Joi, { ObjectSchema } from 'joi';
import { validateRequest, requiredStringValidation, statusValidation } from './common.validations';
import { NextFunction, Request, Response } from 'express';

const taskSchema: ObjectSchema = Joi.object({
  title: requiredStringValidation,
  status: statusValidation
});

function postTaskSchema(req: Request, _res: Response, next: NextFunction) {
  validateRequest(req, next, taskSchema);
}

export { postTaskSchema };
