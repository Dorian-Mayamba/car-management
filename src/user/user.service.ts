import { Injectable } from '@nestjs/common';
import { User } from './models/user.models';
import {User as IUser} from './user.interface';
import { InjectModel } from '@nestjs/sequelize';
import { constants } from './constants';
import { Role } from 'src/role/models/role.models.role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private user:typeof User){}

    async findAll():Promise<User[]>{
        return this.user.findAll();
    }

    async find(id:number):Promise<User>{
        return this.user.findOne({
            where:{
                id
            },
            include:[Role]
        })
    }

    async findUser(email:string, password:string):Promise<User | null>{
       var user:User = await this.user.findOne({
        where:{
            email
        },
        include:[Role]
       });
       if(user){
        const isPassword = await bcrypt.compare(password,user.password);
        if(isPassword) return user;
       }
       return null;
    }

    async create(user:IUser):Promise<User>{
        const hash = await bcrypt.hash(user.password,10);
        return this.user.create({
            name:user.name,
            email:user.email,
            password:hash,
            role_id:this.checkRole(user.email) ? 1:2
        });
    }

    async update(id:number, user:IUser):Promise<User>{
        var userToUpdate = await this.find(id);
        return userToUpdate.update({
            name:userToUpdate.name != user.name && user.name,
            email:userToUpdate.email != user.email && user.email,
            password:userToUpdate.password != user.password && user.password
        })
    }

    async remove(id:number):Promise<void>{
        return (await this.find(id)).destroy();  
    }

    private checkRole(email:string):boolean{
        return email.includes(constants.adminEmail);
    }
}
