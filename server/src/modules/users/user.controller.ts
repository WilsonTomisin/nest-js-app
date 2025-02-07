import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";


@Controller("user")
export class UserController{
    constructor(private readonly userService:UserService){}
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