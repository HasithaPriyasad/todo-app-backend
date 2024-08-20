import { randomUUID } from "crypto";
import { ITask, Task } from "../models/task.model";
import { taskRepository } from "../repositories/task.repository";
import { CreateTaskDTO } from "../dtos/create-task.dto";
import { ErrorStatus } from "../enums/error-status.enum";
import { UpdateTaskDTO } from "../dtos/update-task.dto";
import NotFoundError from "../errors/not-found.error";
class TaskService {
    createTask({title, status }: CreateTaskDTO):ITask {
        const task = new Task(randomUUID(), title, status);
        return taskRepository.createTask(task);
    }

    getAllTasks(): ITask[] {
        return taskRepository.findAll();
    }

    deleteTask(_body: {},params: { id: string }): boolean {
        const {id} = params;
        const task = taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError(ErrorStatus.TASK_NOT_FOUND, 'id', {id: id});
        }
        return taskRepository.deleteTask(id);
    }

    updateTask(body: UpdateTaskDTO, params: { id: string }): ITask | undefined {
        const {id} = params;
        const task = taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError(ErrorStatus.TASK_NOT_FOUND, 'id', {id: id});
        }
        return taskRepository.updateTask(id, body);
    }
}

export const taskService = new TaskService();
