import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

interface CustomError extends Error {
    status?: number;
    errors?: Record<string, unknown>;
    requestData?: Record<string, unknown>;
    stack?: string;
  }

const handler = (err:CustomError, req: Request, res: Response, next: NextFunction) => {
  const response = {
    code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    errors: err.errors,
    requestData: err.requestData,
    stack: err.stack,
  };


  res.status(response.code);
  res.json(response);
};

export default handler;