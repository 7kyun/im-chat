import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserMap extends Base {
  @Column({
    comment: '用户id',
  })
  uid: number;

  @Column({
    comment: '好友的用户id',
  })
  fuid: number;
}
