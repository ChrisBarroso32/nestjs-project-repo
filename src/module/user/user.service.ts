import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {

    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        { id: 1, name: "Chris", email: "chris.e@example.com" },
        { id: 2, name: "Latife", email: "latife.e@example.com" },
    ];

    findAllUsers(name: string = '') {
        this.logger.log("Finding all users")
        return this.users.filter((users) => users.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    findOneUser(id: number) {
        this.logger.log(`Finding user ${id}`)
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        this.logger.log("Creating user")
        const nextId = this.users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
        const user: User = { id: nextId, name: dto.name, email: dto.email };
        this.users.push(user);
        return user;
    }

    updateUser(id: number, dto: UpdateUserDto) {
        this.logger.log(`Updating user ${id}`)
        const user = this.findOneUser(id);
        Object.assign(user, dto);
        return user;
    }

    deleteUser(id: number) {
        this.logger.log(`Deleting user ${id}`)
        const user = this.findOneUser(id);
        this.users = this.users.filter((u) => u.id !== id);
        return user;
    }
}
