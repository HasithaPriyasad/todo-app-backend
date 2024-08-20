import { TaskStatus } from "../enums/task-status.enum";

export interface ITask {
    id: string;
    title: string;
    status: TaskStatus;
}

export class Task implements ITask {
    id: string;
    title: string;
    status: TaskStatus;

    constructor(id: string, title: string, status: TaskStatus) {
        this.id = id;
        this.title = title;
        this.status = status || TaskStatus.NOTDONE;
    }
}