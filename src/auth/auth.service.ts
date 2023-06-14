import { Inject, Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.models';
import { SignUpDto,SignInDto,UpdateInfoDto } from './dtos/auth.dtos.authDtos';
import { JwtService } from '@nestjs/jwt';
import { ValidationError } from 'sequelize';
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

    async login(signInDto:SignInDto):Promise<Record<string,any> | string>{
        var logginUser:User = await this.userService.findUser(signInDto.email, signInDto.password);
        if(logginUser){
            const payload = {
                sub:logginUser.id,
                userName:logginUser.email,
                roleType:logginUser.role?.type
            };

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
        return "Inccorect email or password";
    }

    async updateUser(id:number, updateInfoDto:UpdateInfoDto):Promise<User>{
        return this.userService.update(id,updateInfoDto);
    }

    async deleteUser(id:number):Promise<void>{
        return this.userService.remove(id);
    }
}
