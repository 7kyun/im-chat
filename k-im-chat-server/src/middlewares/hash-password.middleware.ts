import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { encrypt, getSalt } from '../utils/encryption';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const password = req.body['password'];
    if (password) {
      const salt = getSalt();
      const hashPassword = encrypt(password, salt);
      req.body['hashPassword'] = hashPassword;
      req.body['salt'] = salt;
    }

    next();
  }
}
