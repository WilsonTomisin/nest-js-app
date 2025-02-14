import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

type AvailableRoles = "Admin" | "Creator" | "Viewer"

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


    async createAdmin(createUserDto:CreateUserDto):Promise<User>{
        const {password, email} = createUserDto

        const existingAdmin = await this.userModel.findOne({email})

        if (existingAdmin) {
            throw new ConflictException("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const configureAdmin = {...createUserDto, role:"Admin", password:hashedPassword }
        const newAdmin =  await this.userModel.create(configureAdmin)
        return newAdmin.save()
    }

    async updateRole(id:string, newRole:AvailableRoles):Promise<User | null>{
        const updated =  await this.userModel.findByIdAndUpdate(id, { role:newRole}, {new:true}).exec()
        return updated

    }
    async createEditor(createUserDto:CreateUserDto):Promise<User>{
        const {password, email} = createUserDto

        const existingUser = await this.userModel.findOne({email})

        if (existingUser) {
            throw new ConflictException("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const configureUser = {...createUserDto, role:"Creator", password:hashedPassword }
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

    async removeAllUsers(){
        return this.userModel.deleteMany({role:undefined})
    }
}