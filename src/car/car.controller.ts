import { Controller, Inject,Get, Param, ParseIntPipe, Post, Put, UseGuards, Request} from '@nestjs/common';
import { CarService } from './car.service';
import {Car} from './models/car.models';
import { CreateCarDto, UpdateCarDto } from './dtos/car.dtos.carDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';

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

    @Post('verify')
    @UseGuards(AuthGuard, RoleGuard)
    async checkRole(@Request() request):Promise<any>{
        return request?.user;
    }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    async create(createCarDto:CreateCarDto):Promise<Car>{
        return this.carService.create(createCarDto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) updateCarDto:UpdateCarDto, id:number):Promise<Car>{
        return this.carService.update(updateCarDto, id);
    }
}
