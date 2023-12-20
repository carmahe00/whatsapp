import winston from 'winston'
import path from 'path';
const enumerateError = winston.format((info, opts) => {
    if(info instanceof Error)
    Object.assign(info, {message: info.stack})
    return info;
  });

export const logging = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateError(),
    process.env.NODE_ENV === "development"
    ? winston.format.colorize()
    : winston.format.uncolorize(),
    winston.format.splat()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'error.log'),  // Adjust the path as needed
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'warn.log'),  // Adjust the path as needed
      level: 'warn',
      format: winston.format.json()
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'info.log'),  // Adjust the path as needed
      level: 'info',
      format: winston.format.json(),
      
    }),
  ]
});

