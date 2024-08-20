import request from 'supertest';
import app from '../../../src/app';
import { TaskStatus } from '../../../src/enums/task-status.enum';
import { expect } from 'chai';
import { taskRepository } from '../../../src/repositories/task.repository';
import { ErrorStatus } from '../../../src/enums/error-status.enum';

describe('DELETE /tasks/:id', () => {

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
    
    it('should delete a task when the id is given', async () => {
        const response = await request(app)
            .delete('/tasks/1').expect(204);
        expect(response.body).to.be.empty;
    });

    it('should return 404 if the id is not found', async () => {
        const response = await request(app)
            .delete('/tasks/notfoundid').expect(404);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors[0].message).to.equal(ErrorStatus.TASK_NOT_FOUND);
            expect(response.body.errors[0].field).to.equal('id');
    });
});