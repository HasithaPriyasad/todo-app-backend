import { ITask } from "../models/task.model";

class TaskRepository {
    private tasks: ITask[] = [];

    createTask(task: ITask): ITask {
        this.tasks.push(task);
        return task;
    }
