// 共享的  基础 entity
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: number;
}
