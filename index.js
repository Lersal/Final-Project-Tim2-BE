import Express  from "express";
import db from "./config/Databases.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = Express();

try {
    await db.authenticate();
    console.log('Database connected..');

} catch (error) {
    console.error(error);
}

app.use(cors( {credentials:true}))
app.use(cookieParser());
app.use(Express.json());
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));


