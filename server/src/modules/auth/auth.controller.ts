import { Body, Controller, Get,Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UserService
    ){}

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
    
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@Request() req){
        return req.user
    }
}