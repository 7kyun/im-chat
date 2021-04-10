import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import configuration from '../../config/configuration';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.auth.secretKey,
    });
  }
  async validate(data: User) {
    const user = await this.userService.findOneById(data.id);
    if (!user || user.version !== data.version) {
      return false;
    }
    return {
      id: user.id,
      username: user.username,
      version: user.version,
    };
  }
}
