import { IsString } from "class-validator";

export class CreateCarDto{
    @IsString()
    make:string;

    @IsString()
    model:string;

    @IsString()
    name:string;

    @IsString()
    color:string;
}

export class UpdateCarDto extends CreateCarDto{}