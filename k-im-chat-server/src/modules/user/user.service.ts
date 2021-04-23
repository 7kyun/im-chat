import { RegisterDto } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResDto } from 'src/common/dtos/res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description: 通过id查找获取单个用户
   * @param {Number} id 用户id
   * @author kyun
   * @date 2021/3/13
   */
  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ id });
  }

  /**
   * @description: 通过username查找获取单个用户
   * @param {Number} username 用户名
   * @author kyun
   * @date 2021/3/13
   */
  async findOneByName(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }

  /**
   * @description: 写入数据库
   * @param {RegisterDto} registerDto
   * @author kyun
   * @date 2021/4/10
   */
  async create(registerDto: RegisterDto): Promise<User> {
    return await this.userRepository.create(registerDto).save();
  }

  /**
   * @description: 更新version
   * @param {User} user
   * @author kyun
   * @date 2021/4/10
   */
  async updateVersion(user: User): Promise<User> {
    if (user.version || user.version === 0) {
      user.version++;
    }
    return await this.userRepository.save(user);
  }

  /**
   * @description: 获取用户信息
   * @param {String} username 用户名
   * @author kyun
   * @date 2021/3/18
   */
  async getUser(username: string): Promise<ResDto> {
    const data = await this.findOneByName(username);
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, createdAt, ...user } = data;
      return { code: 200, msg: '成功', data: user };
    } else {
      return { code: 400, msg: '查无此用户' };
    }
  }

  /**
   * @description: 获取用户信息
   * @param {String} username 用户名
   * @author kyun
   * @date 2021/3/18
   */
  async getList(username: string): Promise<ResDto> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username like :name', { name: `%${username}%` })
      .getCount();
    const data = await this.userRepository
      .createQueryBuilder('user')
      .skip(0)
      .take(10)
      .where('user.username like :name', { name: `%${username}%` })
      .orderBy('user.id', 'ASC')
      .getMany();
    const list = data.map((v) => {
      const { id, username, avatar } = v;
      return { id, username, avatar };
    });
    return { code: 200, msg: '成功', data: { count, list } };
  }
}
