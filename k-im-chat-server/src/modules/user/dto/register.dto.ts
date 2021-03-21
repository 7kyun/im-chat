import { MinLength } from 'class-validator';

export class RegisterDto {
  username: string;

  @MinLength(6, {
    message: '用户密码至少需要6个字符',
  })
  password: string;
  rePassword: string;
  salt: string;
}
