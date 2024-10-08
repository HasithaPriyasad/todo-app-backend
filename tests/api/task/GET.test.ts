import { use,expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import supertest from 'supertest';

import app from '../../../src/app';
import { taskRepository } from '../../../src/repositories/task.repository';
import { TaskStatus } from '../../../src/enums/task-status.enum';

use(chaiAsPromised);
const request = supertest(app);

describe('Task API - GET /tasks', function() {
    beforeEach(() => {
        taskRepository.resetTasks();
    });

    it('should return an empty array when no tasks exist', async function() {
        const response = await request.get('/tasks').expect(200);
        expect(response.body).to.be.an('array').that.is.empty;
    });

    it('should return all tasks', async function() {
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

        const response = await request.get('/tasks').expect(200);
        expect(response.body).to.be.an('array').that.has.lengthOf(2);
        expect(response.body[0]).to.have.property('title', 'Task 1');
        expect(response.body[1]).to.have.property('title', 'Task 2');
    });

    it('should return empty array when task title does not matched to the search term', async function() {
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

       const response = await request.get('/tasks?searchTerm=H').expect(200);
       expect(response.body).to.be.an('array').that.has.lengthOf(0);
   });

    it('should return all the tasks that the title matched to the searchTerm', async function() {
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

       const responseOne = await request.get('/tasks?searchTerm=Task').expect(200);
       expect(responseOne.body).to.be.an('array').that.has.lengthOf(2);
       expect(responseOne.body[0]).to.have.property('title', 'Task 1');
       expect(responseOne.body[1]).to.have.property('title', 'Task 2');

       const responseTwo = await request.get('/tasks?searchTerm=Task 1').expect(200);
       expect(responseTwo.body).to.be.an('array').that.has.lengthOf(1);
       expect(responseTwo.body[0]).to.have.property('title', 'Task 1');
   });
});
