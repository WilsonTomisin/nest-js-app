import { MinLength,IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { Document } from "mongoose";

export class CreateUserDto {
    @IsNotEmpty()
    fullName:string;

    @IsEmail()
    email:string;

    @MinLength(9)
    @IsOptional()
    password:string;

    @IsOptional()
    role: "Admin" | "Creator" | "Viewer" ;
}