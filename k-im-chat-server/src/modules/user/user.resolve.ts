import { User } from './user.entity';
import { UserService } from './user.service';
import { RegisterData, LoginData } from './dto/user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolve {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getStr() {
    return 'Hello world.';
  }

  @Mutation(() => User)
  register(@Args('data') registerData: RegisterData): Promise<User> {
    return this.userService.register(registerData);
  }

  @Mutation(() => User)
  login(@Args('data') loginData: LoginData): Promise<User> {
    return this.userService.login(loginData);
  }
}
