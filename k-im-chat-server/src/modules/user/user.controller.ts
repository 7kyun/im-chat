import { ResDto } from 'src/shared/dto/res.dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
}
