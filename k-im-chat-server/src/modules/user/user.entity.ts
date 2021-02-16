import bcrypt from 'bcryptjs';
import { Base } from '../../shared/entities/base.entity';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';
import configuration from 'config/configuration';

@Entity()
@ObjectType()
export class User extends Base {
  @Column()
  @Field()
  @Index({ unique: true })
  username: string;

  @Column({ default: 'default.png' })
  @Field()
  avatar: string;

  @Column()
  password: string;

  @Column({ default: false })
  isLogin: boolean;

  // 钩子函数 数据库写入之前
  @BeforeInsert()
  async hashPassword() {
    // 密码加密
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
