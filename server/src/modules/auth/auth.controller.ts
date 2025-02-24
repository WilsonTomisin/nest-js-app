import { Body, Controller, Get,Post, Req, Request, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GoogleGuard } from "./guards/google.guard";
import { HttpExceptionFilter } from "src/common/exceptions/exceptions.filter";

@Controller("auth")

@UseFilters(HttpExceptionFilter)
export class AuthController{
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UserService
    ){}

    @Get("google")
    @UseGuards(GoogleGuard)
    async SignWithGoogle(){
        return 'signing in...'
    }

    @Get("google/callback")
    @UseGuards(GoogleGuard)
    async redirectGoogle( @Req() req){
        return {
            user: req.user
        }
    }


    @Post("register")
    async register(@Body() registerDto:RegisterDto){
        return this.userService.createEditor(registerDto)
    }
    @Post("register/admin")
    async registerAdmin(@Body() registerDto:RegisterDto){
        return this.userService.createAdmin(registerDto)
    }

    @Post("login")
    async login( @Body() loginDto:LoginDto){
        const authorizedUser = await this.authService.validateUser(loginDto)

        return this.authService.login(authorizedUser)
    }
    
    // @UseGuards(JwtAuthGuard)
    // @Get("profile")
    // async getProfile(@Request() req){
    //     return req.user
    // }
}