import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserMap } from '../friend/entities/friend.entity';
import { FriendMessage } from '../friend/entities/friendMessage.entity';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage } from '../group/entity/groupMessage.entity';
import { Logger } from '@nestjs/common';

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
    private readonly friendRepository: Repository<UserMap>,
    // @InjectRepository(FriendMessage)
    // private readonly friendMessageRepository: Repository<FriendMessage>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMap)
    private readonly groupMapRepository: Repository<GroupMap>, // @InjectRepository(GroupMessage) // private readonly groupMessageRepository: Repository<GroupMessage>,
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

  // 获取所有群和好友数据
  @SubscribeMessage('allData')
  async getAllData(
    @ConnectedSocket() _client: Socket,
    @MessageBody() uid: number,
  ) {
    const user = await this.userRepository.findOne({ id: uid });
    if (user) {
      // 好友数据
      let friendArr: FriendDto[] = [];
      // 群组数据
      let groupArr: GroupDto[] = [];

      // 查询用户的好友
      const friendMap: UserMap[] = await this.friendRepository.find({
        uid: user.id,
      });
      // 获取好友的数据
      const friendPromise = friendMap.map(async (item: UserMap) => {
        return await this.userRepository.findOne({ id: item.fuid });
      });
      const friends: FriendDto[] = await Promise.all(friendPromise);
      // 获取与好友的消息
      const friendMessagePromise = friendMap.map(async (item) => {
        const messages = await getRepository(FriendMessage)
          .createQueryBuilder('friendMessage')
          .where(
            `friendMessage.uid = ${item.uid} AND friendMessage.fuid = ${item.fuid}`,
          )
          .where(
            `friendMessage.uid = ${item.fuid} AND friendMessage.fuid = ${item.uid}`,
          )
          .orderBy('friendMessage.createdAt', 'DESC')
          .take(30)
          .getMany();
        return messages.reverse();
      });
      const friendsMessage: Array<FriendMessageDto[]> = await Promise.all(
        friendMessagePromise,
      );
      friends.map((friend, index) => {
        if (friendsMessage[index] && friendsMessage[index].length) {
          friend.messages = friendsMessage[index];
        }
      });
      friendArr = friends;

      // 查询用户的群组
      const groupMap: GroupMap[] = await this.groupMapRepository.find({
        uid: user.id,
      });
      // 获取群组数据
      const groupPromise = groupMap.map(async (v: GroupMap) => {
        return await this.groupRepository.findOne({ id: v.gid });
      });
      const groups: GroupDto[] = await Promise.all(groupPromise);
      // 获取群组消息
      const groupMessagePromise = groupMap.map(async (item) => {
        let groupMessage = await getRepository(GroupMessage)
          .createQueryBuilder('groupMessage')
          .where(`groupMessage.gid = ${item.gid}`)
          .orderBy('groupMessage.createdAt', 'DESC') // 时间倒序先获取最新的
          .take(30) // 最新的前30条
          .getMany();
        groupMessage = groupMessage.reverse(); // 再倒序
        // 这里获取一下发消息的用户的用户信息
        // for (const message of groupMessage) {
        //   if (!userGather[message.userId]) {
        //     userGather[message.userId] = await this.userRepository.findOne({
        //       userId: message.userId,
        //     });
        //   }
        // }
        return groupMessage;
      });
      const groupsMessage: Array<GroupMessageDto[]> = await Promise.all(
        groupMessagePromise,
      );
      groups.map((group, index) => {
        if (groupsMessage[index] && groupsMessage[index].length) {
          group.messages = groupsMessage[index];
        }
      });
      groupArr = groups;

      this.server.to(`${user.id}`).emit('allData', {
        code: 200,
        msg: '获取聊天数据成功',
        data: {
          groupData: groupArr,
          friendData: friendArr,
        },
      });
    }
  }

  // 添加好友
  @SubscribeMessage('addFriend')
  async addFriend(
    @MessageBody() data: UserMap,
    @ConnectedSocket() client: Socket,
  ) {
    const { uid, fuid } = data;
    console.log(uid, fuid);
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
        throw '添加好友失败';
      }
    } catch (e) {
      return this.server.emit('addFriend', {
        code: 400,
        msg: e,
      });
    }
  }

  // 加入私聊的socket连接
  @SubscribeMessage('joinFriend')
  async joinFriend(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UserMap,
  ): Promise<any> {
    const uid = data.uid.toString();
    const fuid = data.fuid.toString();
    if (fuid && uid) {
      const relation = await this.friendRepository.findOne({
        uid: data.uid,
        fuid: data.fuid,
      });
      const roomId = uid > fuid ? uid + fuid : fuid + uid;
      if (relation) {
        client.join(roomId);
        this.server.to(uid).emit('joinFriend', {
          code: 200,
          msg: '成功',
          data: relation,
        });
      }
    }
  }
}
