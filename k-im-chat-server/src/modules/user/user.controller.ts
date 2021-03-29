import { ResDto } from 'src/common/dto/res.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LoginDto } from '../../auth/dto/login.dto';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @description 通过用户名查找
   * @param username
   * @returns
   */
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findOne(@Query('username') username: string): Promise<ResDto> {
    return this.userService.getUser(username);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResDto> {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResDto> {
    return await this.authService.login(loginDto);
  }

  /**
   * @description 通过token获取用户信息
   * @param req
   * @returns
   */
  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async info(@Request() req: any): Promise<ResDto> {
    // 获取token 进行解码
    const { authorization } = req.headers;
    const user = await this.authService.decodeToken(authorization);
    return user;
  }
}
