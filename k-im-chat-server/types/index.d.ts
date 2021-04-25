declare module 'dotenv/config';

interface AuthUser {
  id: number;
  username: string;
  version: number;
  iat: number;
  exp: number;
}
