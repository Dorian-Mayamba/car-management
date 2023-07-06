import { Inject, Injectable,HttpException,HttpStatus, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.models';
import { SignUpDto,SignInDto,UpdateInfoDto } from './dtos/auth.dtos.authDtos';
import { JwtService } from '@nestjs/jwt';
import { ValidationError } from 'sequelize';
import { reponseType } from 'src/types/types';
@Injectable()
export class AuthService {
    constructor(@Inject(UserService) private userService:UserService
    ,@Inject(JwtService) private jwtService:JwtService){}

    async getUsers():Promise<User[]>{
        return this.userService.findAll();
    }

    async getUser(id:number):Promise<User>{
        return this.userService.find(id);
    }

    async register(signUpDto:SignUpDto):Promise<User>{
        return this.userService.create(signUpDto);
    }

    async login(signInDto:SignInDto):Promise<reponseType>{
        var logginUser:User = await this.userService.findUser(signInDto.email, signInDto.password);
        if(logginUser){
            const payload = {
                sub:logginUser.id,
                name:logginUser.name,
                roleType:logginUser.role?.type
            };

            const [access_token, refresh_token] =  await Promise.all([
                this.jwtService.signAsync(payload,{
                    expiresIn:3600,
                }),
                this.jwtService.signAsync(payload, {
                    expiresIn:24 * 3600
                })
            ])

            return {
                access_token:access_token,
                refresh_token:refresh_token,
                name:payload.name,
                id:payload.sub,
                roleType:payload.roleType
            };
        }
        throw new UnauthorizedException('incorrect email or password');
    }

    async updateUser(id:number, updateInfoDto:UpdateInfoDto):Promise<User>{
        return this.userService.update(id,updateInfoDto);
    }

    async deleteUser(id:number):Promise<void>{
        return this.userService.remove(id);
    }
}
