import { IsNotEmpty, IsEmail ,MinLength, IsOptional } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    fullName:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(9)
    password:string;

    @IsOptional()
    role:string;
}
