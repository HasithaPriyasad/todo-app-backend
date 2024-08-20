import { Router } from 'express';
import { taskController } from '../controllers/task.controller'; 
import { postTaskSchema } from '../validations/task.validations';
const router = Router();

router.route('/')
.get(taskController.getAllTasks)
.post(postTaskSchema,taskController.createTask);

export { router as taskRouter };
