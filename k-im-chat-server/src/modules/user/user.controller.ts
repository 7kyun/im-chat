import { ResDto } from 'src/common/dto/res.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description 获取单个用户信息
   * @param username
   * @author kyun
   * @date 2021/4/10
   */
  @Get('info')
  async getUser(@Query('username') username: string): Promise<ResDto> {
    return this.userService.getUser(username);
  }

  /**
   * @description 获取用户列表
   * @param username
   * @author kyun
   * @date 2021/4/10
   */
  @Get('list')
  async getList(@Query('username') username: string): Promise<ResDto> {
    return this.userService.getList(username);
  }
}
