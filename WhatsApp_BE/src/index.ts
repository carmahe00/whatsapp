// src/index.ts


import app from "./app";
import { createServer } from 'http';
import { logging } from "./configs/logger";

const port = process.env.PORT || 8000;
const httpServer = createServer(app);

httpServer.listen(port, () => {
  
  logging.info(`[server]: Server is running at http://localhost:${port}`)
});