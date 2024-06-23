import { Controller, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.enum';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
@Roles(Role.Admin)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);  //deberia devolver el recurso creado
  }
//get byDate / bystatus / bycourt /byprice
  @Get()
  // findAll() {
  async findAll(@Query('userId', ParseIntPipe) userId?: number): Promise<Reservation[]> {
    return this.reservationService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);  //deberia devolver el recurso actualizado
  }

  @Delete(':id')
  async remove(@Param('id') id: string)/* : Promise<void> ResponseObject*/ {
    return this.reservationService.remove(+id);  //deberia devolver 204 HttpStatus.NO_CONTENT
    // return HttpStatus.NO_CONTENT; // aparentemente lo hace automaticamente
  }
}
