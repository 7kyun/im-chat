import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResDto } from '../common/dto/res.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../modules/user/user.entity';
import { encrypt } from '../utils/encryption';

@Injectable()
export class AuthService {
  private response: ResDto;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT 验证 - Step - 2: 校验用户信息
  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.findOneByName(username);
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

  createToken(user: User): string {
    const payload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);
    return `bearer ${token}`;
  }

  async decodeToken(token: string): Promise<any> {
    if (!token) return { code: 400, msg: '未登录' };
    if (
      token.substring(0, 7) === 'Bearer ' ||
      token.substring(0, 7) === 'bearer '
    ) {
      token = token.substring(7);
    }
    const { id } = this.jwtService.decode(token) as {
      username: string;
      id: number;
    };
    if (id) {
      return this.userService
        .findOneById(id)
        .then((user) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, salt, ...data } = user;
          return { code: 200, msg: '成功', data };
        })
        .catch((err) => {
          return err;
        });
    } else {
      return { code: 400, msg: '未登录' };
    }
  }

  async login(loginDto: LoginDto): Promise<ResDto> {
    const { username, password } = loginDto;
    return this.validateUser(username, password)
      .then((data: User) => {
        const token = this.createToken(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, ...user } = data;
        return {
          code: 200,
          msg: '登录成功',
          data: { token, user },
        };
      })
      .catch((err) => err);
  }
}
