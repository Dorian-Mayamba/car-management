import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, UseGuards,HttpException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.models';
import { SignInDto, SignUpDto, UpdateInfoDto } from './dtos/auth.dtos.authDtos';
import { Role } from 'src/role/models/role.models.role';
import { AuthGuard } from './auth.guard';
import { Request, Response, response } from 'express';
import { reponseType } from 'src/types/types';

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
    async loginUser(@Body() signInDto:SignInDto, @Res({passthrough:true}) response:Response):Promise<reponseType>{
        const data = await this.authService.login(signInDto);
        response.cookie("token", data?.access_token, {
            httpOnly:true
        });
        return data;
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Res() response:Response):Promise<Response<any, Record<string,any>>>{
        return response.clearCookie('token').status(HttpStatus.OK).json({
            message:'logout success'
        });
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('verify')
    async verifyUser(@Req() request):Promise<string | undefined>{
        return request?.user;
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


    

}
