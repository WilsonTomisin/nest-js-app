import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async findAll():Promise<User[]>{
        const allUsers = await this.userModel.find()
        return allUsers
    }
    async findByEmail(email:string):Promise<User | null>{
        const foundUser = await this.userModel.findOne({email}).select("+password")
        return foundUser
    }
    async create(createUserDto:CreateUserDto):Promise<User>{
        const {password, email} = createUserDto

        const existingUser = await this.userModel.findOne({email})

        if (existingUser) {
            throw new ConflictException("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const configureUser = {...createUserDto, password:hashedPassword }
        const newUser =  await this.userModel.create(configureUser)
        return newUser.save()
    }

    async findById( id:string):Promise<User | null>{
        const user = await this.userModel.findById(id).exec()
        return user
    }
    async update(id:string, updateUserDto:UpdateUserDto):Promise<User | null >{
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true}).exec()
        return updatedUser
    }
    async remove(id:string):Promise<User|null>{
        return this.userModel.findByIdAndDelete(id).exec()
    }
}