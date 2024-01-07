import express, { Express, Request, Response, NextFunction } from 'express';
import { Result, validationResult } from 'express-validator';
const validationResultRequest: Express = express();

// Middleware to trim whitespace from request body
validationResultRequest.use((req: Request, res: Response, next: NextFunction) => {

  const result: Result = validationResult(req);
  if (result.array().length > 0){
    const formattedErrors = result.array().map((error) => {
      return {
        param: error.path!,
        msg: error.msg,
      };
    });

    return res.status(400).json({
      error: formattedErrors,
    });
  }


  next();
});

export default validationResultRequest