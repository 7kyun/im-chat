import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { encrypt, getSalt } from '../utils/encryption';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    if (userPassword) {
      const salt = getSalt();
      userPassword = encrypt(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }

    next();
  }
}
