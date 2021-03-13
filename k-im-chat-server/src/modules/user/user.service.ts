import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { encrypt, getSalt } from 'src/utils/encryption';
import { ResDto } from 'src/shared/dto/res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description: 注册
   * @param {RegisterDto} registerDto
   * @return {*}
   */
  async register(registerDto: RegisterDto): Promise<ResDto> {
    const { username, password, rePassword } = registerDto;
    if (password !== rePassword)
      return { code: 400, msg: '两次输入的密码不一致' };
    const users = await this.userRepository.find({ username });
    if (users && users.length) return { code: 400, msg: '用户已存在' };

    const salt = getSalt();
    registerDto.password = encrypt(password, salt);

    try {
      const user: User = await this.userRepository
        .create({ ...registerDto, salt })
        .save();
      const { password, ...data } = user;
      return {
        code: 200,
        data,
        msg: '注册成功',
      };
    } catch (err) {
      return {
        code: 503,
        msg: `Service error: ${err}`,
      };
    }
  }

  /**
   * @description: 查找获取单个用户
   * @param {string} username 用户名
   * @return {*}
   */
  async findOne(username: string): Promise<ResDto> {
    console.log('username', username);
    const user = await this.userRepository.findOne(username);
    console.log('user', user);
    if (!user) {
      return { code: 200, msg: '查无此用户', data: null };
    }
    const { password, salt, ...data } = user;
    return { code: 200, msg: '成功', data };
  }
}
