import { MinLength,IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    fullName:string;

    @IsEmail()
    email:string;

    @MinLength(9)
    password:string;
}