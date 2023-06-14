import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.models';
@Module({
  imports:[SequelizeModule.forFeature([User])],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
