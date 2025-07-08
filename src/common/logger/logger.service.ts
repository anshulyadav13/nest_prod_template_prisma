import { Injectable, Logger as NestLogger } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '../../config/config.service';
import { ENV_KEYS } from '../constants/app.constants';
import callsite from 'callsite';

/**
 * Custom LoggerService for NestJS applications, extending NestLogger.
 * This service integrates Winston for flexible logging capabilities,
 * including dynamic log levels based on the environment and
 * automatic inclusion of the calling function's name in log messages.
 */
@Injectable()
export class LoggerService extends NestLogger {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    super();
    const logLevel = this.getLogLevel();
    this.logger = winston.createLogger({
      level: logLevel,
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp, context }: { level: any, message: any, timestamp: any, context: any }) => {
          const formattedTimestamp = timestamp.slice(0, 19);
          return `[${level}] [${formattedTimestamp}] ${message}${context ? ` - ${JSON.stringify(context)}` : ''}`;
        }),
      ),
    });
  }

  /**
   * Retrieves the name of the function that called the logger method.
   * This is achieved by parsing the stack trace using callsite.
   * @returns A string in the format "filename:functionName".
   */
  private getFunctionName(): string {
    const stack = callsite();
    const caller = stack[2];
    const fileName = caller.getFileName();
    const functionName = caller.getFunctionName() || 'anonymous';
    return `${fileName}:${functionName}`;
  }

  private getLogLevel(): string {
    const environment = this.configService.get(ENV_KEYS.environment) || 'development';
    const logLevels: { [key: string]: string } = {
      development: 'debug',
      staging: 'debug',
      production: 'warn',
    };
    return logLevels[environment] || 'info';
  }

  log(message: any, context?: any): void {
    const functionName = this.getFunctionName();
    this.logger.info(`[${functionName}] ${message}`, { context });
  }

  error(message: any, context?: any): void {
    const functionName = this.getFunctionName();
    this.logger.error(`[${functionName}] ${message}`, { context });
  }

  warn(message: any, context?: any): void {
    const functionName = this.getFunctionName();
    this.logger.warn(`[${functionName}] ${message}`, { context });
  }

  debug(message: any, context?: any): void {
    const functionName = this.getFunctionName();
    this.logger.debug(`[${functionName}] ${message}`, { context });
  }

  verbose(message: any, context?: any): void {
    const functionName = this.getFunctionName();
    this.logger.verbose(`[${functionName}] ${message}`, { context });
  }
}