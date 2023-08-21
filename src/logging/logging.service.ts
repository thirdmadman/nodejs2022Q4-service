import { LoggerService } from '@nestjs/common';
import { FileWriter } from './filewriter';

export const LogLevels = {
  none: 0,
  error: 1,
  warn: 2,
  log: 3,
  debug: 4,
  verbose: 5,
};

export class LoggingService implements LoggerService {
  private logLevel = 5;

  private fileWriter = new FileWriter();

  writeLog(data: string) {
    console.log(data);
    this.fileWriter.writeLog(data);
  }

  writeError(data: string) {
    console.error(data);
    this.fileWriter.writeError(data);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string, context?: string) {
    if (this.logLevel < 1) return null;

    this.writeError(`ERROR [${context}] ${message}`);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, context?: string) {
    if (this.logLevel < 2) return null;
    this.writeLog(`WARN [${context}] ${message}`);
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    if (this.logLevel < 3) return null;

    this.writeLog(`LOG [${context}] ${message}`);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: string, context?: string) {
    if (this.logLevel < 4) return null;

    this.writeLog(`DEBUG [${context}] ${message}`);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string, context?: string) {
    if (this.logLevel < 5) return null;

    this.writeLog(`VERBOSE [${context}] ${message}`);
  }

  setLogLevel(logLevel: number) {
    this.logLevel = logLevel;
  }

  setLogsPath(path: string) {
    this.fileWriter.setPath(path);
  }
}
