import { ResDto } from 'src/shared/dto/res.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOne(@Param('username') username: string): Promise<ResDto> {
    return await this.userService.findOne(username);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResDto> {
    return await this.userService.register(registerDto);
  }
}
