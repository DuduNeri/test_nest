import { Injectable } from '@nestjs/common';
import { User } from '../users.model';
import { InjectModel } from '@nestjs/sequelize';
import { InferCreationAttributes } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(data: InferCreationAttributes<User>) {
    try {
      const user = await this.userModel.create(data);
      
      if (!data.name || !data.email || !data.password) {
        throw new Error('Preencha todos os campos');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error('Erro detalhado:', error);
    }
  }
}
