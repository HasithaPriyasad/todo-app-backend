import express, { Application } from "express";
import routes from './routes/index';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.use(errorMiddleware);

export default app;