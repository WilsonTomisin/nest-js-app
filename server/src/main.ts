import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.enableCors({
  //   origin:"http://localhost:5173",
  //   methods:"GET,POST,PUT,PATCH,DELETE",
  //   allowedHeaders:""
  //   credentials: true
  // })
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
  console.log("listening on PORT:3000")
}
bootstrap();
