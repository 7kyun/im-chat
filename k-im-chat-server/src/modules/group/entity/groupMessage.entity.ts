import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

// 群组消息表
@Entity()
export class GroupMessage extends Base {
  @Column({
    comment: '用户id',
  })
  uid: string;

  @Column({
    comment: '群组id',
  })
  gid: string;

  @Column({
    comment: '消息内容',
  })
  content: string;
}
