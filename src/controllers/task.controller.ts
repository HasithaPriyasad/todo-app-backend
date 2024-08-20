import { NextFunction, Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { handle } from './helper';
import httpStatus from 'http-status';
``
class TaskController {
    createTask(req: Request<{},{},CreateTaskDTO>, res: Response, next: NextFunction): void {
        handle(req, res, next, taskService.createTask, httpStatus.CREATED);
    }
}

export const taskController = new TaskController();