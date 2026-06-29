import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Post()
    createUser(@Body()createUserDto: CreateUserDto){
        this.usersService.create(createUserDto);
    }

    @Get()
    getUser(){
        this.usersService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id')id: string) {
        this.usersService.findOne(id);
    }
    @Put(':id')
    updateUser(@Param('id')id: string, @Body()updateUserDto: UpdateUserDto) {
        this.usersService
    }
    @Delete(':id')
    deleteUser(@Param('id')id: string) {
        this.usersService
    }

}
