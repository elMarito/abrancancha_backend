import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEndPoints(): any {
    const API_URL_BASE= ""
    // const API_URL_BASE= app.geturl()
    // const API_URL_BASE= "http://localhost:3000"
    return {
      auth: API_URL_BASE+'/auth',
      administrators: API_URL_BASE+'/administrators',
      users: API_URL_BASE+'/users',
      statusOfUser: API_URL_BASE+'/statusOfUser',
      courts: API_URL_BASE+'/courts',
      typeOfCourt: API_URL_BASE+'/typeOfCourt',
      statusOfCourt: API_URL_BASE+'/statusOfCourt',
      tariff: API_URL_BASE+'/tariff',
      timetables: API_URL_BASE+'/timetables',
      schedules: API_URL_BASE+'/schedules',
      reservations: API_URL_BASE+'/reservations',
      statusOfReservation: API_URL_BASE+'/statusOfReservation',
      club: API_URL_BASE+'/club',
      exceptionsTimeDate: API_URL_BASE+'/exceptionsTimeDate',
    };
  }

}
