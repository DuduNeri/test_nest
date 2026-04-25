import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../../../dto/create-user.dto';
import type { IUserResponse } from '../../../interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(data: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      isActive: true,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async getAll(): Promise<IUserResponse[]> {
    const users = await this.userModel.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  async getUserById(id: number): Promise<IUserResponse> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  
}
