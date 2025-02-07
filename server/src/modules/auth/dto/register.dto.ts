import { IsNotEmpty, IsEmail ,MinLength } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    fullName:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(9)
    password:string;

}
