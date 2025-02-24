import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
        const {password , email} = createUserDto

        const existingAdmin = await this.userModel.findOne({email})

        if (existingAdmin) {
            throw new ConflictException("User already exists")
        }
        try {
            const hashedPassword = await bcrypt.hash(password,10)
            const configureAdmin = {...createUserDto, role:"Admin", password:hashedPassword }
            const newAdmin =  await this.userModel.create(configureAdmin)
            return newAdmin.save()
        } catch (error) {
            throw new ForbiddenException("Could not create an admin")
        }
       
    }

    async createEditor(createUserDto:CreateUserDto):Promise<User>{
        const {password, email} = createUserDto

        const existingUser = await this.userModel.findOne({email})

        if (existingUser) {
            throw new ConflictException("User already exists")
            
        }
        try {
            const hashedPassword = await bcrypt.hash(password,10)
            const configureUser = {...createUserDto, role:"Creator", password:hashedPassword }
            const newUser =  await this.userModel.create(configureUser)
            return newUser.save()
        } catch (error) {
            throw new ForbiddenException("Could not create user")
        }
    }
    async updateRole(id:string, newRole:AvailableRoles):Promise<User | null>{
        const updated =  await this.userModel.findByIdAndUpdate(id, { role:newRole}, {new:true}).exec()
        return updated

    }
    

    async findById( id:string):Promise<User | null>{
        try {
            const user = await this.userModel.findById(id).exec()
            if (!user) {
                throw new NotFoundException('user does not exist')
            }
            return user
        } catch (error) {
            // this block handles error that pertains to the ID format
            throw new NotFoundException("could not find user.")
        }
       
    }
    async update(id:string, updateUserDto:UpdateUserDto):Promise<User | null >{
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true}).exec()
            return updatedUser
        } catch (error) {
            throw new BadRequestException("Could not update user")
        }
        
    }
    async remove(id:string):Promise<any>{
        const removedUser = await this.userModel.findByIdAndDelete(id).exec()

        return{
            message:`${removedUser?._id} has been removed `
        } 
    }

    async removeAllUsers(){
         const removedUsers = await this.userModel.deleteMany({role:undefined})

        return {
            message:`${removedUsers.deletedCount} users have been removed`
        }
    }
}