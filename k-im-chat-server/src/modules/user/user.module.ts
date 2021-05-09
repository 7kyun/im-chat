import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserMap } from '../friend/entities/friend.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GroupMap } from '../group/entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMap, GroupMap]), AuthModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
