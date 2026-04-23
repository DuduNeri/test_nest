import { Controller, Post, Body } from '@nestjs/common';
import { InferCreationAttributes } from 'sequelize';
import { UsersService } from './services/create.users.service';
import type { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() body: InferCreationAttributes<User>) {
    console.log(body);
    return this.service.create(body);
  }
}