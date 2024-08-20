import { TaskStatus } from "../enums/task-status.enum"

export interface CreateTaskDTO {
    title: string
    status: TaskStatus
}