import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResDto } from 'src/common/dtos/res.dto';
import { RegisterDto } from 'src/modules/user/dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('regist')
  async register(@Body() registerDto: RegisterDto): Promise<ResDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResDto> {
    return await this.authService.login(loginDto);
  }

  /**
   * @description 通过token获取用户信息
   * @param req
   * @author kyun
   * @date 2021/4/10
   */
  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async info(@Request() req: any): Promise<ResDto> {
    // 获取token 进行解码
    const { authorization } = req.headers;
    return await this.authService.decodeToken(authorization);
  }
}
