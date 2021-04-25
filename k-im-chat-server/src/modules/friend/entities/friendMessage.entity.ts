import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class FriendMessage extends Base {
  @Column({
    comment: '用户id',
  })
  uid: number;

  @Column({
    comment: '好友的用户id',
  })
  fuid: number;

  @Column({
    comment: '消息内容',
  })
  content: string;

  @Column({
    comment: '消息类型',
  })
  messageType: string;
}
