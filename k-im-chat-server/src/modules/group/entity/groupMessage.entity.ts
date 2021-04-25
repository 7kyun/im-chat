import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

// 群组消息表
@Entity()
export class GroupMessage extends Base {
  @Column({
    comment: '用户id',
  })
  uid: number;

  @Column({
    comment: '群组id',
  })
  gid: number;

  @Column({
    comment: '消息内容',
  })
  content: string;

  @Column({
    comment: '消息类型',
  })
  messageType: string;
}
