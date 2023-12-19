// src/index.ts
import app from "./app";
import { createServer } from 'http';



const port = process.env.PORT || 8000;
const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});