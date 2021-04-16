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
    comment: '内容',
  })
  content: string;
}
