import { HttpException } from '@nestjs/common';

export function throwException(exception: HttpException): never {
  throw exception;
}
