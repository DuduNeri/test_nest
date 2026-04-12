import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { User } from './interfaces';


@Injectable()
export class UsersService {
    private users: User[] = [];

    create(user: Omit<User, 'id'>) {
        const existingUser = this.users.find(
            u => u.name === user.name
        )

        if (existingUser) {
            throw new BadRequestException("Esse nome já está em uso")
        }
        const newUser = {
            id: this.users.length + 1,
            ...user,
        };
        
        this.users.push(newUser);
        return newUser;
    }

    findAll() {
        return this.users.map(({ password, ...user }) => user);
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    update(id: number, data: Partial<User>) {
        const user = this.findOne(id);

        if (!user) return null;

        Object.assign(user, data);
        return user;
    }

    remove(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return { deleted: true };
    }
}