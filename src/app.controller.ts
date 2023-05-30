import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/')
  getJson(@Req() req: Request, @Res() res: Response) {
    console.log(req.query);
    return res.status(200).send(req.query);
    // return res.status(200).send({
    //   status: 'ok',
    // });
  }
}
