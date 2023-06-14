import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.models.role';
import { RoleController } from './role.controller';
@Module({
  imports:[SequelizeModule.forFeature([Role])],
  providers: [RoleService],
  exports:[RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
