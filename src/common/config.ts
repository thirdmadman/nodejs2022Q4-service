import { config } from 'dotenv';
import { join } from 'path';

config();

export const PORT = process.env.PORT || '4000';
export const CRYPT_SALT = process.env.CRYPT_SALT || '10';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret123123';
export const JWT_SECRET_REFRESH_KEY =
  process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';
export const LOGGING_LEVEL = +(process.env.LOGGING_LEVEL || 5);
export const LOGGING_DIR =
  process.env.LOGGING_DIR || join(process.cwd(), '/logs/');
