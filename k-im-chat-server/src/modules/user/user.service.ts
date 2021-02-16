import { RegisterData, LoginData } from './dto/user.dto';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async register(registerData: RegisterData): Promise<User> {
    return await this.userRepository.create(registerData).save();
  }

  async login(loginData: LoginData): Promise<User> {
    return await this.userRepository.findOneOrFail({
      username: loginData.username,
    });
  }
}
