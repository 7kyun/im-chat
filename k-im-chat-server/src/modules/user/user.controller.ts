import { ResDto } from 'src/common/dtos/res.dto';
import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserList } from './dtos/user.dto';

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
   * @param keyword
   * @author kyun
   * @date 2021/4/24
   */
  @Get('list')
  async getList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Request() req: any,
  ): Promise<ResDto> {
    const { authorization } = req.headers;
    const data: UserList = { page, size, keyword };
    return this.userService.getList(data, authorization);
  }
}
