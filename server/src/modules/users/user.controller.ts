import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UnauthorizedException, UseFilters, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/guards/role.decorator";
import { HttpExceptionFilter } from "src/common/exceptions/exceptions.filter";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


@Controller("user")
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class UserController{
    constructor(private readonly userService:UserService){}

    @Roles("Admin") // only admins can access this route
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers():Promise<User[]>{
        const allUsers = this.userService.findAll()
        return allUsers
        
    }

    
    @Get(":id")
    @UseFilters(HttpExceptionFilter)
    async getUser(@Param("id") id:string){
        const foundUser = await this.userService.findById(id)
        return foundUser
    }

    @Patch(":id")
    @UseFilters(HttpExceptionFilter)
    async updateUser(@Param("id") id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }

    @Delete(":id")
    @UseFilters(HttpExceptionFilter)
    async deleterUser(@Param("id") id:string){
        return this.userService.remove(id)
    }

    @Delete()
    @UseFilters(HttpExceptionFilter)
    async deleteUsers(){
        return this.userService.removeAllUsers()
    }
}