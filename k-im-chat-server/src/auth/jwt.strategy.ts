import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../modules/user/user.entity';
import configuration from '../../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.auth.secretKey,
    });
  }
  // JWT验证 - Step 4: 被守卫调用
  async validate(user: User) {
    //console.log('JWT验证 - Step 4: 被守卫调用');
    return {
      id: user.id,
      username: user.username,
    };
  }
}
