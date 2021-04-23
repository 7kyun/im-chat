import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMap } from '../friend/entities/friend.entity';
import { FriendMessage } from '../friend/entities/friendMessage.entity';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage } from '../group/entity/groupMessage.entity';
import { User } from '../user/entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserMap,
      FriendMessage,
      Group,
      GroupMap,
      GroupMessage,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatModule {}
