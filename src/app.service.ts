import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEndPoints(): Record<string,string> {
    return {
      auth: 'http://localhost:3000/auth',
      administrators: 'http://localhost:3000/administrators',
      users: 'http://localhost:3000/users',
      statusOfUser: 'http://localhost:3000/statusOfUser',
      courts: 'http://localhost:3000/courts',
      typeOfCourt: 'http://localhost:3000/typeOfCourt',
      statusOfCourt: 'http://localhost:3000/statusOfCourt',
      tariff: 'http://localhost:3000/tariff',
      timetables: 'http://localhost:3000/timetables',
      schedules: 'http://localhost:3000/schedules',
      reservations: 'http://localhost:3000/reservations',
      statusOfReservation: 'http://localhost:3000/statusOfReservation',
      club: 'http://localhost:3000/club',
      exceptionsTimeDate: 'http://localhost:3000/exceptionsTimeDate',
    };
  }

}
