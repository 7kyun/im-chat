import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsUserAlreadyExist } from '../validators/IsUserAlreadyExist';
import { PasswordIsEqual } from '../validators/PasswordIsEqual';
import { LoginCheck } from '../validators/LoginCheck';

// 注册
@InputType()
export class RegisterData {
  @Field()
  @MinLength(2)
  @IsUserAlreadyExist()
  username: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @MinLength(6)
  @PasswordIsEqual('password', { message: '两次输入的密码不一致' })
  confirmPassword: string;
}

// 登录
@InputType()
export class LoginData {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @LoginCheck('username')
  password: string;
}
