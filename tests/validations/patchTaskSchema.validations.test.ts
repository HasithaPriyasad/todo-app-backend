import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { patchTaskSchema } from '../../src/validations/task.validations';
import { Request, Response } from 'express';
import { TaskStatus } from '../../src/enums/task-status.enum';

use(chaiAsPromised);

describe('Task Validations ', function () {
  const requestObj: Request = {
      body: {
        status: TaskStatus.DONE
      },
  } as Request

  it('should validate a correct request', function () {
    const responseObj: Response = {} as Response;
    const nextFunction = async (arg: any) => {
      expect(arg).to.be.undefined;
    };
    patchTaskSchema(requestObj, responseObj, nextFunction);
  });

  describe('patchTaskSchema', () => {
    it('Should validate "status" is required', async () => {
      const req = structuredClone(requestObj);
      delete req.body.status;
      const responseObj: Response = {} as Response;
      const nextFunction = async (arg: any) => {
        expect(arg.message).to.equal('Validation Error');
        expect(arg.errors[0].message).to.equal('"status" is required');
      };

      patchTaskSchema(requestObj, responseObj, nextFunction);
    });

    it('Should validate "status" allowed values [DONE, NOTDONE]', async () => {
      const req = structuredClone(requestObj);
      req.body.status = 'test';
      const responseObj: Response = {} as Response;
      const nextFunction = async (arg: any) => {
        expect(arg.message).to.equal('Validation Error');
        expect(arg.errors[0].message).to.equal('"status" must be one of [DONE,NOTDONE]');
      };
      patchTaskSchema(requestObj, responseObj, nextFunction);
    });
  });
});
