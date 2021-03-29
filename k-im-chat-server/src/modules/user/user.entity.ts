import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends Base {
  @Column({
    comment: '用户名',
  })
  username: string;

  @Column({
    comment: '密码(至少六位数)',
  })
  password: string;

  @Column({
    comment: '密码盐',
  })
  salt: string;

  @Column({
    comment: '头像',
    default: 'default.png',
  })
  avatar: string;
}
