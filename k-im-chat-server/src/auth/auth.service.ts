import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResDto } from '../common/dtos/res.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../modules/user/entities/user.entity';
import { encrypt } from '../utils/encryption';
import { RegisterDto } from 'src/modules/user/dtos/register.dto';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private response: ResDto;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      const hashPassword = encrypt(password, user.salt);
      if (user.password === hashPassword) {
        return user;
      } else {
        this.response = { code: 400, msg: '密码错误' };
        throw this.response;
      }
    } else {
      this.response = { code: 400, msg: '用户不存在' };
      throw this.response;
    }
  }

  private createToken(user: User): string {
    const payload = {
      username: user.username,
      id: user.id,
      version: user.version,
    };
    const token = this.jwtService.sign(payload);
    return `bearer ${token}`;
  }

  async decodeToken(token: string): Promise<UserDto> {
    if (!token) throw { code: 401, msg: '未登录' };
    if (
      token.substring(0, 7) === 'Bearer ' ||
      token.substring(0, 7) === 'bearer '
    ) {
      token = token.substring(7);
    }
    const { id } = this.jwtService.decode(token) as {
      username: string;
      id: number;
      version: number;
    };
    if (id) {
      const user = await this.userRepository.findOne({ id });
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, ...data } = user;
        return data;
      } else {
        throw { code: 401, msg: '登录过期，请重新登录' };
      }
    } else {
      throw { code: 401, msg: '登录过期，请重新登录' };
    }
  }

  async getAuthInfo(token: string): Promise<ResDto> {
    try {
      const data: UserDto = await this.decodeToken(token);
      return { code: 200, msg: '成功', data };
    } catch (e) {
      return e;
    }
  }

  /**
   * @description: 注册
   * @param {RegisterDto} registerDto
   * @author kyun
   * @date 2021/3/13
   */
  async register(registerDto: RegisterDto): Promise<ResDto> {
    const { username, password, rePassword, hashPassword } = registerDto;
    if (password !== rePassword) {
      return { code: 400, msg: '两次输入的密码不一致' };
    }
    const user = await this.userRepository.findOne({ username });
    if (user) {
      return { code: 400, msg: '用户已存在' };
    }
    try {
      registerDto.password = hashPassword;
      const data = await this.userRepository.create(registerDto).save();
      const token = this.createToken(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...user } = data;
      return { code: 200, msg: '注册成功', data: { token, user } };
    } catch (err) {
      return { code: 503, msg: '服务器错误' };
    }
  }

  /**
   * @description: 登录
   * @param {LoginDto} loginDto
   * @author kyun
   * @date 2021/3/13
   */
  async login(loginDto: LoginDto): Promise<ResDto> {
    try {
      let data: User = await this.validateUser(
        loginDto.username,
        loginDto.password,
      );
      // 更新用户 version
      if (data.version || data.version === 0) {
        data.version++;
      }
      data = await this.userRepository.save(data);
      const token = this.createToken(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...user } = data;
      return { code: 200, msg: '登录成功', data: { token, user } };
    } catch (e) {
      return e;
    }
  }
}
