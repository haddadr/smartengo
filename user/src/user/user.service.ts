import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(query: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: User): Promise<InsertResult> {
    try {
      Logger.log('before user creation');
      const userEntity = await this.userRepository.create(user);
      Logger.log('after user creation');
      // Logger.log(userEntity);
      // const res =
      //Logger.log('createUser - Created user');
      return this.userRepository.insert(userEntity);
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
