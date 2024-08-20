import { Router } from 'express';
import { taskController } from '../controllers/task.controller'; 
import { postTaskSchema } from '../validations/task.validations';
const router = Router();

router.route('/')
.post(postTaskSchema,taskController.createTask);

export { router as taskRouter };
