import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './models/role.models.role';
import { User } from 'src/user/models/user.models';

@Controller('role')
export class RoleController {
    constructor(@Inject(RoleService) private roleService:RoleService){}

    @Get()
    async findAll():Promise<Role[]>{
        return this.roleService.findRoles();
    }

    @Get(':id')
    async find(@Param('id', ParseIntPipe) id:number):Promise<Role>{
        return this.roleService.find(id);
    }

    @Get('admin/:id')
    async findAdmins(@Param('id', ParseIntPipe) id:number):Promise<User[]>{
        return this.roleService.findAdmins(id);
    }
}
