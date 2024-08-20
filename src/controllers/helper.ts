import { NextFunction, Request, Response } from 'express';

type TserviceFn<Params = Request['params'], Body = Request['body'], Query = Request['query']> = (
  body: Body,
  params: Params,
  query: Query
) => unknown;

const handle = <Params, Body, Query>(
  req: Request<Params, {}, Body, Query>, 
  res: Response, 
  next: NextFunction, 
  serviceFn: TserviceFn<Params, Body, Query>, 
  resStatusCode: number
): void => {
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