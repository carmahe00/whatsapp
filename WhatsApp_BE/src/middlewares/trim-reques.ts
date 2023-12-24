import express, { Express, Request, Response, NextFunction } from 'express';

const trimRequest: Express = express();

// Middleware to trim whitespace from request body
trimRequest.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    // Trim whitespace from string properties in the request body
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  // Trim route parameters
  if (req.params) {
    Object.keys(req.params).forEach(key => {
      if (typeof req.params[key] === 'string') {
        req.params[key] = req.params[key].trim();
      }
    });
  }

  next();
});

export default trimRequest