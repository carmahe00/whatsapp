import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import expressMongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors';

dotenv.config();
const app: Express = express();


app.use(morgan('dev')); // Logs of request
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressMongoSanitize())
app.use(cookieParser())
app.use(compression()) // gzip body of request
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post("/test", (req: Request, res: Response) => {
    res.send(req.body);
});




export default app;