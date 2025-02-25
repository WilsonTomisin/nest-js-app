import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { User } from "../users/schemas/user.schema";
import { Profile } from "passport-google-oauth20";

@Injectable()
export class AuthService{

    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}

    async validateGoogleUser(profile:Profile):Promise<{accessToken:string, user:User}>{
        const { displayName, emails} = profile 

        let primaryEmail =  typeof emails === 'undefined' ? null : emails[0].value
        if (!primaryEmail) {
            throw new UnauthorizedException("email not found")
        }
        
        
        let googleUser = await this.userService.findByEmail(primaryEmail)

        if (!googleUser) {
            googleUser = await this.userService.createEditor({
                email:primaryEmail,
                fullName:displayName,
                role:"Creator",
                password:"" ,    
            })
        }
        const { password , ...data} = googleUser.toObject()
        return {
            accessToken: this.jwtService.sign({
                id:googleUser._id,
                email:googleUser.email,
                fullName:googleUser.fullName,
                role:googleUser.role,
            }),
            user: data
        }

    }
    // checks if user credentials are correct 
    async validateUser(loginDto:LoginDto):Promise<any>{
        const user = await this.userService.findByEmail(loginDto.email)
        
        if (user &&(await bcrypt.compare(loginDto.password, user.password))) {
            const {password, ...data} = user.toObject()
            return data
        }
        throw new UnauthorizedException("Invalid details")
    }
    // after user has been validated this method is called and a JWT Token is singned with...
    //the payload i.e{ email, id}
    async login(user:User){
        // console.log('JWT Secret:', process.env.JWT_SECRET);
        return {
            data:{
                accessToken: this.jwtService.sign({
                    id: user._id,
                    email:user.email,
                    fullName: user.fullName,
                    role:user.role
                }),
                user
            }
        }
    }

}