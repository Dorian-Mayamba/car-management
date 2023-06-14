import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {SequelizeModule} from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { User } from './user/models/user.models';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/models/role.models.role';
import { CarModule } from './car/car.module';
import {Car} from './car/models/car.models';

dotenv.config();

@Module({
  imports: [UserModule,SequelizeModule.forRoot({
    dialect:(process.env.DB_DIALECT as Dialect),
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    models:[User,Role,Car]
  }), AuthModule, RoleModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
