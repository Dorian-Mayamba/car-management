import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './models/car.models';

@Module({
  imports:[SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
  exports:[CarService]
})
export class CarModule {}
