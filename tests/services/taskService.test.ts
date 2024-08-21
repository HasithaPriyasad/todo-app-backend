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

    describe('getAllTasks', function () {
        it('should return all tasks', function () {
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
    
            const taskList = taskService.getAllTasks({},{},{searchTerm: undefined});
            expect(taskList[0]).to.have.property('id');
            expect(taskList[0].title).to.equal('Task 1');
            expect(taskList[1].title).to.equal('Task 2');
            expect(taskList[0].status).to.equal(TaskStatus.NOTDONE);
            expect(taskList).to.have.lengthOf(2);
        });

        it('should return all tasks related to the searchTerm', function () {
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
    
            const taskList = taskService.getAllTasks({},{},{searchTerm: 'Task 1'});
            expect(taskList[0]).to.have.property('id');
            expect(taskList[0].title).to.equal('Task 1');
            expect(taskList[0].status).to.equal(TaskStatus.NOTDONE);
            expect(taskList).to.have.lengthOf(1);
        });
    });

    describe('deleteTask', function () {
        it('should delete the given task', function () {
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
    
            expect(taskService.deleteTask({},{id: '1'})).to.be.equal(true);
            const taskList = taskService.getAllTasks({},{},{searchTerm: undefined});
            expect(taskList[0].title).to.equal('Task 2');
            expect(taskList).to.have.lengthOf(1);
        });

        it('should throw an error with 404 when the id is not available', function () {
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
    
            const _body =  {};
            expect(() => taskService.deleteTask(_body, { id: '3' })).to.throw('Not Found');
            
        });
    });

    describe('updateTask', function () {
        it('should update the given task', function () {
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
    
            const task = taskService.updateTask({status: TaskStatus.DONE},{id: '1'})
            const taskList = taskService.getAllTasks({},{},{searchTerm: undefined});
            expect(task).to.have.property('id');
            expect(task?.title).to.equal('Task 1');
            expect(task?.status).to.equal(TaskStatus.DONE);
            expect(taskList[0]).to.have.property('id');
            expect(taskList[0].title).to.equal('Task 1');
            expect(taskList[0].status).to.equal(TaskStatus.DONE);
            expect(taskList[1].title).to.equal('Task 2');
            expect(taskList).to.have.lengthOf(2);
        });

        it('should throw an error with 404 when the id is not available', function () {
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
    
            expect(() => taskService.updateTask({status: TaskStatus.DONE},{id: '3'})).to.throw('Not Found');
            
        });
    });
});
