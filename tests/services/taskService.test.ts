import { expect,use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { taskService } from '../../src/services/task.service'; 
import { taskRepository } from '../../src/repositories/task.repository'; 
import { TaskStatus } from '../../src/enums/task-status.enum';

use(chaiAsPromised);
describe('TaskService', function () {
    beforeEach(() => {
        taskRepository.resetTasks();
    });

    describe('createTask', function () {
        it('should create a new task with valid data', function () {
            const task = taskService.createTask({title: 'Test Task', status: TaskStatus.NOTDONE});
            expect(task).to.have.property('id');
            expect(task.title).to.equal('Test Task');
            expect(task.status).to.equal(TaskStatus.NOTDONE);
            expect(taskRepository['tasks']).to.have.lengthOf(1);
        });
    });
});
