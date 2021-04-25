import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

// 群组表
@Entity()
export class Group extends Base {
  @Column({
    comment: '群主id',
  })
  uid: number;

  @Column({
    comment: '群组名称',
  })
  groupName: string;

  @Column({
    comment: '公告',
    default: '群主很懒, 没写公告',
  })
  notice: string;
}

// 群组 和 用户关联的中间表
@Entity()
export class GroupMap extends Base {
  @Column({
    comment: '群组id',
  })
  gid: number;

  @Column({
    comment: '用户id',
  })
  uid: number;
}
