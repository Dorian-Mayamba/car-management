import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Car} from './models/car.models';
import {Car as ICAR} from './car.interface';
@Injectable()
export class CarService {
    constructor(@InjectModel(Car) private carModel:typeof Car){}

    async findAll():Promise<Car[]>{
        return this.carModel.findAll();
    }

    async find(id:number):Promise<Car>{
        return this.carModel.findOne({
            where:{
                id
            }
        });
    }

    async update(car:ICAR, id:number):Promise<Car>{
        var carToUpdate:Car = await this.find(id);
        return carToUpdate.update(car);
    }

    async remove(id:number):Promise<void>{
        var carToDelete:Car = await this.find(id);
        carToDelete.destroy();
    }

    async create(car:ICAR):Promise<Car>{
        return this.carModel.create({});
    }
}
