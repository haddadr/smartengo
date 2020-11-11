import {
  Controller,
  UseGuards,
  Get,
  Logger,
  Post,
  Request, Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { InsertResult } from 'typeorm';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }

  @Post('create')
  createUser(@Body() body: User): Promise<InsertResult> {
    console.log('user creation');
    return this.userService.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
