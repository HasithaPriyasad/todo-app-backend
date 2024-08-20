import { ITask } from "../models/task.model";

class TaskRepository {
    private tasks: ITask[] = [];

    createTask(task: ITask): ITask {
        this.tasks.push(task);
        return task;
    }

    findAll(): ITask[] {
        return this.tasks;
    }

    deleteTask(id: string): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }

    findById(id: string): ITask | undefined {
        return this.tasks.find(task => task.id === id);
    }

    resetTasks(): void {
        this.tasks = [];
    }

  
}

export const taskRepository = new TaskRepository();
