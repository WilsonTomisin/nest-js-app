import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { UserModule } from './modules/users/user.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { Connection } from 'mongoose';


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>{
        const DBString =configService.get<string>("DATABASE")
        const DBPassword = configService.get<string>("DB_PASSWORD") as string
        const DB = DBString?.replace("<db_password>",DBPassword)
        // console.log(`Connecting to ${DBString}....`)
        return{ 
          uri:DB, 
          onConnectionCreate:(connection:Connection)=>{
            connection.on('connecting',()=>console.log('Connecting to database'))
            connection.on("connected", ()=> console.log("connected to database"))
            return connection
          }
        }
      },
      
      inject:[ConfigService]
    }),
    AuthModule,
    NotesModule, 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure( consumer:MiddlewareConsumer){

    consumer.apply(LoggerMiddleware).forRoutes(AppController) // just me testing out middleware😄
  }
}
