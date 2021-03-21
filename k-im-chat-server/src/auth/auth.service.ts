import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResDto } from '../shared/dto/res.dto';
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
  ): Promise<ResDto> {
    //console.log('JWT 验证 - Step - 2: 校验用户信息');
    const user = await this.userService.findOne(username);
    if (user) {
      const hashPassword = encrypt(password, user.salt);
      if (user.password === hashPassword) {
        return { code: 200, msg: '成功', data: user };
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
    const payload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto): Promise<ResDto> {
    const { username, password } = loginDto;
    return this.validateUser(username, password)
      .then(async (res: ResDto) => {
        if (res.code === 200) {
          const user = res.data;
          const token = await this.createToken(user);
          this.response = {
            code: 200,
            msg: '登录成功',
            data: { token },
          };
          return this.response;
        } else {
          this.response = res;
          throw this.response;
        }
      })
      .catch((err) => err);
  }
}
