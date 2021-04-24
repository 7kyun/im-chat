import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import configuration from '../../config/configuration';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.auth.secretKey,
    });
  }
  async validate(data: User) {
    const user = await this.userRepository.findOne({ id: data.id });
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
