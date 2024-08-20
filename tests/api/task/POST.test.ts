import request from 'supertest';
import app from '../../../src/app';
import { TaskStatus } from '../../../src/enums/task-status.enum';
import { expect } from 'chai';
import { taskRepository } from '../../../src/repositories/task.repository';

describe('POST /task', () => {

    beforeEach(() => {
        taskRepository.resetTasks();
    });
    
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'New Task', status: TaskStatus.NOTDONE }).expect(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.be.equal('New Task');
    });

    it('should return 400 if title is a number', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 1, status: TaskStatus.NOTDONE }).expect(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"title" must be a string');
    });

    it('should return 400 if title is missing', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ status: TaskStatus.NOTDONE }).expect(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"title" is required');
    });

    it('should return 400 if status is missing', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title:'New Task' }).expect(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"status" is required');
    });

    
    it('should return 400 if title is empty', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: '', status: TaskStatus.DONE }).expect(400);

        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"title" is not allowed to be empty');
    });

    it('should return 400 if status is empty', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'New Task', status: '' });

        expect(response.body).to.have.property('errors');
        expect(response.body.errors[0].message).to.equal('"status" must be one of [DONE, NOTDONE]');
    });
});