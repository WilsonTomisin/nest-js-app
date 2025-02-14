import { CanActivate,Injectable,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RolesGuard implements CanActivate{
        constructor( private reflector:Reflector, private jwtService:JwtService, private configService:ConfigService ){}

        async canActivate(context:ExecutionContext):Promise<boolean>{
            const requiredRole = this.reflector.get<string[]>('roles', context.getHandler())
            // above will get the "role" metadata values as defined in the Role decorator
            console.log(requiredRole)

            if(!requiredRole) return true

            const request = context.switchToHttp().getRequest<Request>()

            const token = request.headers.authorization?.split(" ")[1]
            if(!token) return false 

            try {
                const parsedUser = await this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_SECRET")})
                const userRole = parsedUser.role;
                return requiredRole.includes(userRole)
            } catch (error) {
                return false
            }
        }
}