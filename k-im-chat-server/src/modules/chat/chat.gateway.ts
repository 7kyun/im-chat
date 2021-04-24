import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserMap } from '../friend/entities/friend.entity';
import { Logger } from '@nestjs/common';
// import { Logger } from '@nestjs/common';
// import { FriendMessage } from '../friend/entities/friendMessage.entity';
// import { Group, GroupMap } from '../group/entity/group.entity';
// import { GroupMessage } from '../group/entity/groupMessage.entity';

const logger = new Logger('chat.gateway.ts');

@WebSocketGateway({ namespace: '/chat', transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  defalutRoom: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserMap)
    private readonly friendRepository: Repository<UserMap>, // @InjectRepository(FriendMessage) // private readonly friendMessageRepository: Repository<FriendMessage>, // @InjectRepository(Group) // private readonly groupRepository: Repository<Group>, // @InjectRepository(GroupMap) // private readonly groupMapRepository: Repository<GroupMap>, // @InjectRepository(GroupMessage) // private readonly groupMessageRepository: Repository<GroupMessage>,
  ) {
    this.defalutRoom = '公共';
  }

  // socket 连接钩子
  async handleConnection(client: Socket): Promise<string> {
    const { uid } = client.handshake.query;
    // logger.log('连接成功: uid =', uid);
    logger.log(`连接成功: uid = ${uid}`);

    if (uid) {
      // 连接成功后加入自己的 room
      client.join(uid);
    }

    return '连接成功';
  }

  // socket断连钩子
  async handleDisconnect(): Promise<string> {
    logger.log('连接断开');

    return '连接断开';
  }

  // 添加好友
  @SubscribeMessage('addFriend')
  async addFriend(
    @MessageBody() data: UserMap,
    @ConnectedSocket() client: Socket,
  ) {
    const { uid, fuid } = data;
    try {
      if (uid && fuid) {
        const user = await this.userRepository.findOne({ id: uid });
        if (!user) {
          return this.server
            .to(uid + '')
            .emit('addFriend', { code: 400, msg: '服务数据错误', data: '' });
        }
        const friend = await this.userRepository.findOne({ id: fuid });
        if (!friend) {
          return this.server
            .to(uid + '')
            .emit('addFriend', { code: 400, msg: '该用户不存在', data: '' });
        }
        if (uid === fuid) {
          return this.server.to(uid + '').emit('addFriend', {
            code: 400,
            msg: '不能添加自己为好友',
            data: '',
          });
        }
        const isHave1 = await this.friendRepository.findOne({ uid, fuid });
        const isHave2 = await this.friendRepository.findOne({ uid, fuid });

        if (isHave1 || isHave2) {
          return this.server.emit('addFriend', {
            code: 400,
            msg: '已经有该好友',
            data: data,
          });
        }
        if (!friend) {
          return this.server
            .to(uid + '')
            .emit('addFriend', { code: 400, msg: '该用户不存在', data: '' });
        }
        // 双方都添加好友 并存入数据库
        await this.friendRepository.save(data);
        const friendData = JSON.parse(JSON.stringify(data));
        const fData = {
          uid: friendData.fuid,
          fuid: friendData.uid,
        };
        await this.friendRepository.save(fData);

        const roomId = uid > fuid ? uid + fuid : fuid + uid;
        client.join(roomId + '');
        this.server.to(uid + '').emit('addFriend', {
          code: 200,
          msg: '添加成功',
          data: {
            id: friend.id,
            username: friend.username,
            avatar: friend.avatar,
          },
        });
        this.server.to(fuid + '').emit('addFriend', {
          code: 200,
          message: '被加为好友',
          data: { id: user.id, username: user.username, avatar: user.avatar },
        });
        return;
      } else {
        throw '';
      }
    } catch (e) {
      return { code: 400, msg: '添加好友失败', data: e };
    }
  }
}
