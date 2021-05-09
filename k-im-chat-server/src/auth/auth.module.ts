import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { PassportModule } from '@nestjs/passport';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { GroupMap } from 'src/modules/group/entity/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, GroupMap]),
    PassportModule,
    JwtModule.register({
      secret: configuration.auth.secretKey,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/regist');
  }
}
