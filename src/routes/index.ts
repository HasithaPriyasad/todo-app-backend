import express from 'express';

import { taskRouter } from './task.routes';

const router = express.Router();

router.use('/tasks', taskRouter);

export default router;
