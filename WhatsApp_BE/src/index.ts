// src/index.ts
import app from "./app";
import { Server } from 'socket.io'
import 'dotenv/config'
import { createServer } from 'http';
import { logging } from "./configs/logger";
const { DATABASE_URL } = process.env;
import mongoose from 'mongoose';
import WhatsAppSocket from "./socket/whats-app.socket";

const port = process.env.PORT || 8000;
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  pingTimeout: 60000,
  cors:{
    origin: process.env.CLIENT_ENDPOINT
  }
 });


const start = async () => {
  new WhatsAppSocket(io)
  console.log(process.env.NODE_ENV)
  const connectionMongo = await mongoose.connect(DATABASE_URL!, {
    dbName: "WHATSAPP"
  })
  connectionMongo.connection.on("error",
    err => {
      logging.error(`MongoDB connection error: ${err}`)
      process.exit(1)
    })
  if (process.env.NODE_ENV !== "production")
    connectionMongo.set("debug", true)
  process.on("SIGINT", () => logging.warn("Server closed"))
  process.on("SIGTERM", () => logging.warn("Server closed"))

  httpServer.listen(port, () => {
    // console.log(process.pid)
    logging.info(`[server]: Server is running at http://localhost:${port}`)
  });
}

start()