import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
    imports:[
        MongooseModule.forFeature([{ name:User.name, schema:UserSchema}]),
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: async (configService:ConfigService)=>{
                // const jwtsecret = configService.get<string>("JWT_SECRET")
                // console.log(jwtsecret)
                return{
                secret:configService.get<string>("JWT_SECRET"),
                signOptions:{
                    expiresIn:"1hr"
                }
            }}
        })
    ],
    controllers:[AuthController],
    providers:[AuthService, UserService, JwtStrategy],
    exports:[JwtModule]
})
export class AuthModule {}