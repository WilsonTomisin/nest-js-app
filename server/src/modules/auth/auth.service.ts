import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { User } from "../users/schemas/user.schema";

@Injectable()
export class AuthService{

    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}
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
            accessToken: this.jwtService.sign({
                id: user._id,
                email:user.email,
                fullName: user.fullName,
                role:user.role
            })
        }
    }

}