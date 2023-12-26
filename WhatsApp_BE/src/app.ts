import express, { Express, Request, Response, NextFunction } from "express";

import morgan from 'morgan';
import expressMongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors';
import createHttpError from 'http-errors';
import routes from "./routes";

const app: Express = express();


app.use(morgan('dev')); // Logs of request
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressMongoSanitize())
app.use(cookieParser())
app.use(compression()) // gzip body of request
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors())

//routes
app.use("/api/v1", routes)

app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound("This route doesn't exist"))
})

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.status)
        next()
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


export default app;