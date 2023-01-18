import {Controller, Get, Param, Req} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/:microName/*')
  async getHello(@Req() req, @Param('microName') microName: string): Promise<any> {
    const host = req.get('Host');
    const originUrl = req.originalUrl.substring(microName.length + 1);

    console.log('host: ', host)
    console.log('originUrl: ', originUrl)
    console.log('microName: ', microName)
    console.log(`go to url: http://${microName}${originUrl}`)

    // microName = '127.0.0.1:3000' // mock

    try {
      return  (await firstValueFrom(this.httpService.get(`http://${microName}${originUrl}`, {})))?.data;
    } catch (e) {
      console.log(`e: ${e}`)
      return 'error'
    }
  }
}
