import { randomUUID } from "crypto";
import { ITask, Task } from "../models/task.model";
import { taskRepository } from "../repositories/task.repository";
import { CreateTaskDTO } from "../dtos/create-task.dto";

class TaskService {
    createTask({title, status }: CreateTaskDTO):ITask {
        const task = new Task(randomUUID(), title, status);
        return taskRepository.createTask(task);
    }

    getAllTasks(): ITask[] {
        return taskRepository.findAll();
    }
}

export const taskService = new TaskService();
