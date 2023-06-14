import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Request, UseGuards,HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.models';
import { SignInDto, SignUpDto, UpdateInfoDto } from './dtos/auth.dtos.authDtos';
import { Role } from 'src/role/models/role.models.role';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private authService:AuthService){}

    @Get('/users')
    async getUsers():Promise<User[]>{
        return this.authService.getUsers();
    }

    @Get('/users/:id')
    async getUser(@Param('id', ParseIntPipe) id:number):Promise<User>{
        return this.authService.getUser(id);
    }

    @Post('register')
    async registerUser(@Body() signUpDto:SignUpDto):Promise<User>{
        return this.authService.register(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginUser(@Body() signInDto:SignInDto):Promise<Record<string,any> | string>{
        return this.authService.login(signInDto);
    }

    @Put('user/:id')
    async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateInfoDto:UpdateInfoDto):Promise<User>{
        return this.authService.updateUser(id,updateInfoDto);
    }

    @Delete('user/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number):Promise<void>{
        return this.authService.deleteUser(id);
    }

    @Get('user/role/:id')
    async getRole(@Param('id', ParseIntPipe) id:number):Promise<Role>{
        var targetUser:User = await this.getUser(id);
        return targetUser.role;
    }
    @UseGuards(AuthGuard)
    @Get('user/profile')
    async profile(@Request() request):Promise<any>{
        return request?.user;
    }

    

}
