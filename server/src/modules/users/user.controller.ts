import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/guards/role.decorator";


@Controller("user")
export class UserController{
    constructor(private readonly userService:UserService){}

    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers():Promise<User[]>{
        return this.userService.findAll()
    }

    // @Post()
    // async createUser( @Body() createUserDto:CreateUserDto){
    //     return this.userService.create(createUserDto)
    // }
    
    @Get(":id")
    async getUser(@Param("id") id:string){
        return this.userService.findById(id)
    }

    @Patch(":id")
    async updateUser(@Param("id") id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }
}