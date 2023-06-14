import {IsString, IsEmail, Length} from 'class-validator';

export class SignUpDto{
    @IsString()    
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    @Length(8, Infinity)
    password:string;
}

export class SignInDto{
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}

export class UpdateInfoDto extends SignUpDto{}