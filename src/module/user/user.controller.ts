import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(@Query('name') name: string) {
        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return {
            data: this.userService.createUser(createUserDto),
            message: 'User created successfully',
        };
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return {
            data: this.userService.updateUser(id, updateUserDto),
            message: 'User updated successfully',
        };
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return {
            data: this.userService.deleteUser(id),
            message: 'User deleted successfully',
        };
    }
}
