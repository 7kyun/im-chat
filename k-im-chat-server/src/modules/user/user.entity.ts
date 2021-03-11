import bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';
import configuration from 'config/configuration';
import { Base } from 'src/shared/entities/base.entity';

@Entity()
@ObjectType()
export class User extends Base {
  @Column({
    comment: '用户名',
  })
  @Field()
  @Index({ unique: true })
  username: string;

  @Column({
    default: 'default.png',
    comment: '用户头像',
  })
  @Field()
  avatar: string;

  @Column()
  password: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'is_login',
    comment: '是否登录 1是 0否',
  })
  isLogin: boolean;

  // 钩子函数 数据库写入之前密码加密
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Field(() => String)
  get token() {
    // 生成并输出token
    const payload = { id: this.id, username: this.username };
    return jwt.sign(payload, configuration.auth.secretKey, {
      expiresIn: '5h',
    });
  }
}
