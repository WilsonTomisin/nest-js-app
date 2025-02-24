import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy ,VerifyCallback} from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor( 
        private readonly configService:ConfigService, 
        private readonly authService:AuthService
    ){

        super({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID") as string,
            clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET") || "",
            callbackURL:configService.get<string>("GOOGLE_CALLBACK_URL") ,
            scope:["email","profile"],
        })
    }
    async validate( accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback): Promise<any> {
        // console.log(`
        //     accessToken: ${accessToken},
        //     refreshToken: ${refreshToken},
        //     profile:${profile.displayName}
        // `)
        const user = this.authService.validateGoogleUser(profile)
        return done(null, user)
        
    }


}