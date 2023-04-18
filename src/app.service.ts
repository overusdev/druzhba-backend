import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      id: 1,
      text: 'App test text',
    });
  }
}
