import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import type { IUserResponse } from '../../interfaces/user.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.service.create(data);
  }

  @Get()
  getAllUsers(): Promise<IUserResponse[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUserById(id);
  }

  @Get('ping')
ping() {
  return 'ok';
}
}
