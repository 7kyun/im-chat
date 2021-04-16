import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMap } from './entities/friend.entity';
import { FriendMessage } from './entities/friendMessage.entity';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMap, FriendMessage])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
