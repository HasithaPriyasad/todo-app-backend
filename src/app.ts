import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: true }));
app.use('/', routes);

app.use(errorMiddleware);

export default app;