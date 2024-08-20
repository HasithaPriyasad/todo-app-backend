import request from 'supertest';
import app from '../../../src/app';
import { TaskStatus } from '../../../src/enums/task-status.enum';
import { expect } from 'chai';
import { taskRepository } from '../../../src/repositories/task.repository';
import httpStatus from 'http-status';

describe('POST /task', () => {

    beforeEach(() => {
        taskRepository.resetTasks();

        taskRepository.createTask({
          id: '1',
          title: 'Task 1',
          status: TaskStatus.NOTDONE,
        });

        taskRepository.createTask({
          id: '2',
          title: 'Task 2',
          status: TaskStatus.DONE,
        });
    });
    
    it('should patch a give task', async () => {
        const response = await request(app)
            .patch('/tasks/1')
            .send({status: TaskStatus.DONE }).expect(httpStatus.OK);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.be.equal('Task 1');
        expect(response.body.status).to.be.equal(TaskStatus.DONE);
    });

    it('should return 400 if status is missing', async () => {
        const response = await request(app)
            .patch('/tasks/1')
            .send({}).expect(httpStatus.BAD_REQUEST);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"status" is required');
    });

    it('should return 400 if status is empty', async () => {
        const response = await request(app)
            .patch('/tasks/1')
            .send({status: '' });

        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"status" must be one of [DONE, NOTDONE]');
    });
});