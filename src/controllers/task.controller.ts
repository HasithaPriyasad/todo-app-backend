import { NextFunction, Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { handle } from './helper';
import httpStatus from 'http-status';
import { UpdateTaskDTO } from '../dtos/update-task.dto';
class TaskController {
    createTask(req: Request<{},{},CreateTaskDTO>, res: Response, next: NextFunction): void {
        handle(req, res, next, taskService.createTask, httpStatus.CREATED);
    }

    getAllTasks(req: Request, res: Response, next: NextFunction): void {
        handle(req, res, next, taskService.getAllTasks, httpStatus.OK);
    }

    deleteTask(req: Request< { id: string }, {}, {}>, res: Response, next: NextFunction): void { 
        handle(req, res, next, taskService.deleteTask, httpStatus.NO_CONTENT);
    }

    updateTask(req: Request< { id: string }, {}, UpdateTaskDTO>, res: Response, next: NextFunction): void {
        handle(req, res, next, taskService.updateTask, httpStatus.OK);
    }
}

export const taskController = new TaskController();
