import { NextFunction, Request, Response } from 'express';

type TserviceFn = (
  body: Request['body'],
  params: Request['body'],
  query: Request['query']
) => unknown

const handle = (req: Request, res: Response, next: NextFunction, serviceFn: TserviceFn, resStatusCode: number): void => {
  try {
    const { body, params, query } = req;
    const data = serviceFn(body, params, query);
    res.status(resStatusCode).json(data);
  } catch (error) {
    next(error);
  }
};

export {
  handle,
};