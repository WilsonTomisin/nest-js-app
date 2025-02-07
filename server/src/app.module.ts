import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { UserModule } from './modules/users/user.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';


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
        console.log(`Connecting to ${DB}....`)
        return{ uri:DB }
      },
      inject:[ConfigService]
    }),
    AuthModule,
    NotesModule, 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
