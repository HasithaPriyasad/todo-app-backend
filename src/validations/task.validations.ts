import Joi, { ObjectSchema } from 'joi';
import { validateRequest, requiredStringValidation, statusValidation } from './common.validations';
import { NextFunction, Request, Response } from 'express';

const taskSchemaForCreate: ObjectSchema = Joi.object({
  title: requiredStringValidation,
  status: statusValidation
});

const taskSchemaForUpdate: ObjectSchema = Joi.object({ 
  status: statusValidation
});

function postTaskSchema(req: Request, _res: Response, next: NextFunction) {
  validateRequest(req, next, taskSchemaForCreate);
}

function patchTaskSchema(req: Request, _res: Response, next: NextFunction) {
  validateRequest(req, next, taskSchemaForUpdate);
}
export { postTaskSchema,patchTaskSchema };
