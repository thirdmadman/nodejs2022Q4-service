import { LoggerService } from '@nestjs/common';

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

  /**
   * Write an 'error' level log.
   */
  error(message: string, context?: string) {
    if (this.logLevel < 1) return null;

    console.log(`ERROR [${context}] ${message}`);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, context?: string) {
    if (this.logLevel < 2) return null;
    console.log(`WARN [${context}] ${message}`);
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    if (this.logLevel < 3) return null;

    console.log(`LOG [${context}] ${message}`);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: string, context?: string) {
    if (this.logLevel < 4) return null;

    console.log(`DEBUG [${context}] ${message}`);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string, context?: string) {
    if (this.logLevel < 5) return null;

    console.log(`VERBOSE [${context}] ${message}`);
  }

  setLogLevel(logLevel: number) {
    this.logLevel = logLevel;
  }
}
