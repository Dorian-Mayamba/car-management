import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.models.role';
import { User } from 'src/user/models/user.models';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private role:typeof Role){
        this.role = role;
    }

    async findRoles():Promise<Role[]>{
        return this.role.findAll();
    }

    async find(id:number):Promise<Role>{
        return this.role.findOne({
            where:{
                id
            },
            include:[User]
        });
    }

    async findRoleType(id:number):Promise<String>{
        return (await this.find(id)).type;
    }

    async findAdmins(id:number):Promise<User[]>{
        var roleWithAdmin:Role = await this.find(id);
        return roleWithAdmin.users;
    }
}
