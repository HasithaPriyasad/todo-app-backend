import { Router } from 'express';
import { taskController } from '../controllers/task.controller'; 
import { postTaskSchema, patchTaskSchema } from '../validations/task.validations';
const router = Router();
const nestedRouter = Router();

nestedRouter.route('/')
.get(taskController.getAllTasks)
.post(postTaskSchema, taskController.createTask);

router.use('/', nestedRouter).route('/:id').delete(taskController.deleteTask).patch(patchTaskSchema,taskController.updateTask);

export { router as taskRouter };
