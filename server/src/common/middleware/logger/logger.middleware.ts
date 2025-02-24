import {  Injectable, NestMiddleware } from '@nestjs/common';


@Injectable()

export class LoggerMiddleware implements NestMiddleware {
    use(request:any, response:any, next:()=>void){
        let date = new Date
        console.log(`middleware runnig now. Date is ${date.toDateString()}`)
        next();
    }
}
