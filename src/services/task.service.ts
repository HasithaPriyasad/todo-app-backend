// src/services/TaskService.ts
import { randomUUID } from "crypto";
import { ITask, Task } from "../models/task.model";
import { taskRepository } from "../repositories/task.repository"; 
import { TaskStatus } from "../enums/task-status.enum"; 
import { CreateTaskDTO } from "../dtos/create-task.dot";

class TaskService {
    createTask({title, status }: CreateTaskDTO):ITask {
        const task = new Task(randomUUID(), title, status);
        return taskRepository.createTask(task);
    }
