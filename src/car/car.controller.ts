import { Controller, Inject,Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { CarService } from './car.service';
import Car from './models/car.models';
import { CreateCarDto, UpdateCarDto } from './dtos/car.dtos.createCarDto';

@Controller('car')
export class CarController {
    constructor(@Inject(CarService) private carService:CarService){}

    @Get()
    async findAll():Promise<Car[]>{
        return this.carService.findAll();
    }

    @Get(':id')
    async find(@Param('id', ParseIntPipe) id:number):Promise<Car>{
        return this.carService.find(id);
    }

    @Post('create')
    async create(createCarDto:CreateCarDto):Promise<Car>{
        return this.carService.create(createCarDto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) updateCarDto:UpdateCarDto, id:number):Promise<Car>{
        return this.carService.update(updateCarDto, id);
    }
}
