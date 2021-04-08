import { User } from './user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { ResDto } from 'src/common/dto/res.dto';

const logger = new Logger('user.service.ts');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description: 注册
   * @param {RegisterDto} registerDto
   * @author kyun
   * @date 2021/3/13
   */
  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password, rePassword, hashPassword } = registerDto;
    if (password !== rePassword) {
      logger.log('两次输入的密码不一致');
      throw { code: 400, msg: '两次输入的密码不一致' };
    }
    const user = await this.userRepository.findOne({ username });
    if (user) {
      logger.log('用户已存在');
      throw { code: 400, msg: '用户已存在' };
    }
    try {
      registerDto.password = hashPassword;
      return await this.userRepository.create(registerDto).save();
    } catch (err) {
      logger.log(`Service error: ${err}`);
      throw { code: 503, msg: '服务器错误' };
    }
  }

  /**
   * @description: 获取用户信息
   * @param {String} username 用户名
   * @author kyun
   * @date 2021/3/18
   */
  async getUser(username: string): Promise<ResDto> {
    return this.findOneByName(username)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, createdAt, updatedAt, ...user } = res;
        return { code: 200, msg: '成功', data: user };
      })
      .catch((err) => err);
  }

  /**
   * @description: 根据id查找获取单个用户
   * @param {Number} id 用户id
   * @author kyun
   * @date 2021/3/13
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw { code: 400, msg: '查无此用户' };
    }
    return user;
  }

  /**
   * @description: 通过用户名根据id查找获取单个用户
   * @param {Number} id 用户名
   * @author kyun
   * @date 2021/3/13
   */
  async findOneByName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw { code: 400, msg: '查无此用户' };
    }
    return user;
  }
}
