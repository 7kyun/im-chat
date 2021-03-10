// 登录时 验证用户是否存在 且 密码是否正确
import { User } from '../user.entity';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import bcrypt from 'bcryptjs';

@ValidatorConstraint({ async: true })
export class LoginCheckConstraint implements ValidatorConstraintInterface {
  async validate(password: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const username = (args.object as any)[relatedPropertyName];
    const user = await User.findOne({ username });

    if (user) {
      return await bcrypt.compare(password, user.password);
    }

    return false;
  }

  defaultMessage() {
    return 'User not found or wrong credentials .';
  }
}

export function LoginCheck(
  property: 'username',
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: LoginCheckConstraint,
    });
  };
}
