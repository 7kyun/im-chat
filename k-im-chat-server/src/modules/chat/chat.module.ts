import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMap } from '../friend/entities/friend.entity';
import { FriendMessage } from '../friend/entities/friendMessage.entity';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UserMap, FriendMessage])],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatModule {}
