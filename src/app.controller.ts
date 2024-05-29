import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/roles.decorator';
import { Request, Response } from 'express';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  // getEndPoints(): any {
  //   return this.appService.getEndPoints();
  // }
  async getEndPoints(@Res() res: Response): Promise<void> {
    const data = await this.appService.getEndPoints();
    res.status(HttpStatus.ACCEPTED).json(data);
  }
}