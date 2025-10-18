import { TransformableInfo } from 'logform';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const logger = WinstonModule.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf((info: TransformableInfo) => {
      const { timestamp, level, message, stack } = info;

      return String(
        stack
          ? `[${timestamp}] ${level}: ${message}\n${stack}`
          : `[${timestamp}] ${level}: ${message}`,
      );
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});
