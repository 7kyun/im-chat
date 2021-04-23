// 共享的  基础 entity
import { getNow } from 'src/utils/util';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'created_at',
    comment: '创建时间',
    default: getNow(),
  })
  createdAt: number;
}
