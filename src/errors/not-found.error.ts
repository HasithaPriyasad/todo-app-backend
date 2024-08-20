export default class NotFoundError extends Error {
    status: number;
    errors: { message: string, field: string }[];
    requestData: unknown;

    constructor(message: string, field: string, requestData: unknown) {
      super('Not Found');
      this.name = this.constructor.name;
      this.status = 404;
      this.errors = [{
        message,
        field,
      }];
      this.requestData = requestData;
      Error.captureStackTrace(this, NotFoundError);
    }
  }
  