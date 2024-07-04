import { Controller, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
// import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
// import { RoleGuard } from 'src/auth/role.guard';

@Controller('reservations')
// @Roles(Role.Admin, Role.User)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Roles(Role.Admin, Role.User)
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);  //deberia devolver el recurso creado
  }
//get byDate / bystatus / bycourt /byprice
  @Get()
  @Public()
  // findAll() {
  async findAll(@Query('userId', new ParseIntPipe({ optional: true })) userId: number): Promise<Reservation[]> {
    // async findAll(@Query('userId') userId: string): Promise<Reservation[]> {
      // let parsedUserId: number = null;
  
      // if (userId && !isNaN(parseInt(userId, 10))) {
      //   parsedUserId = parseInt(userId, 10);
      // }
      // debugger
    return this.reservationService.findAll(userId);
  }

  @Get(':id')
  @Public()
  // @Roles(Role.Admin, Role.User)
  async findOne(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);  //deberia devolver el recurso actualizado
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  async remove(@Param('id') id: string)/* : Promise<void> ResponseObject*/ {
    return this.reservationService.remove(+id);  //deberia devolver 204 HttpStatus.NO_CONTENT
    // return HttpStatus.NO_CONTENT; // aparentemente lo hace automaticamente
  }
}
