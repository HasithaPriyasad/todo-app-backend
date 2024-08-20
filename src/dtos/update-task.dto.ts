import { TaskStatus } from "../enums/task-status.enum"

export interface UpdateTaskDTO {
    status: TaskStatus
}