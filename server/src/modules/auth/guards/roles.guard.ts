import { CanActivate,Injectable,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate{
        constructor( private reflector:Reflector, private jwtService:JwtService ){}

        canActivate(context:ExecutionContext):boolean{
            const requiredRole = this.reflector.get<string[]>('roles', context.getHandler())
            // above will get the "role" metadata values as defined in the Role decorator
            console.log(requiredRole)

            if(!requiredRole) return true

            const request = context.switchToHttp().getRequest<Request>()

            console.log(request.user|| 'error here')
            const token = request.headers.authorization?.split(" ")[1]

            if(!token) return false


            try {
                const parsedUser = this.jwtService.verify(token)
                const userRole = parsedUser.role;
                return requiredRole.includes(userRole)
            } catch (error) {
                return false
            }
        }
}