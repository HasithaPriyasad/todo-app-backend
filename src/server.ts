
import { port } from "./config/config";
import app from "./app";

app.listen(port,() => {
 console.log(`server is listening to the port ${port}`);
})