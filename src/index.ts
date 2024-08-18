import express, { Request, Response } from "express";
import { port } from "./config/config";

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({title:"todo-app backend initialized"});
});

app.listen(port,() => {
 console.log(`sever is listen to the port ${port}`);
})