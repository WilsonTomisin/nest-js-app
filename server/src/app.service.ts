import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
// {
//   "email":"michael@gmail.com",
//   "password":"mypassword"
// }
// {
//   "email":"johnjames@gmail.com",
//   "password":"johnjames1"
// }
// {
//   "fullName":"Admin 1",
//   "email":"admin@gmail.com",
//   "password":"adminpassword"
// }