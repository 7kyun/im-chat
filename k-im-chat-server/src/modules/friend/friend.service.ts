import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMap } from './entities/friend.entity';
import { FriendMessage } from './entities/friendMessage.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserMap)
    private readonly friendRepository: Repository<UserMap>,
    @InjectRepository(FriendMessage)
    private readonly friendMessageRepository: Repository<FriendMessage>,
  ) {}

  async getList(uid: number) {
    return this.friendRepository.find({ uid });
  }

  async getMessage(uid: number, fuid: number) {
    return this.friendMessageRepository.findOne({ uid, fuid });
  }
}
