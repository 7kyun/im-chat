import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../../auth/auth.service';
import { HashPasswordMiddleware } from '../../middlewares/hash-password.middleware';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: configuration.auth.secretKey }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HashPasswordMiddleware).forRoutes('user/register');
  }
}
