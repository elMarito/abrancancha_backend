import { Controller, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
// import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { QueryReservationDto } from './dto/query-reservation.dto';
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
  // @Public()
  @Roles(Role.Admin, Role.User)
  // findAll() {
  /* // dado el siguiente controlador de nestjs como modificarlo si el parametro es de tipo Date:
    async findAll(@Query('idUser', new ParseIntPipe({ optional: true })) idUser: number): Promise<Reservation[]> {
    return this.reservationService.findAll(idUser);
  } */
 
    async findAll(
      // @Query('idUser', new ParseIntPipe({ optional: true })) idUser: number,
      // @Query('fecha',) fecha?: string, // Parámetro fecha opcional
      // @Query('orderBy',) orderBy?: string, // Parámetro fecha opcional
      @Query() params?: QueryReservationDto, // Parámetro fecha opcional
    ): Promise<Reservation[]> {
      return this.reservationService.findAll(params);
  // async findAll(@Query('idUser', new ParseIntPipe({ optional: true })) idUser: number): Promise<Reservation[]> {
    // async findAll(@Query('idUser') idUser: string): Promise<Reservation[]> {
      // let parsedIdUser: number = null;
  
      // if (idUser && !isNaN(parseInt(idUser, 10))) {
      //   idUser = parseInt(idUser, 10);
      // }
      // debugger
    // return this.reservationService.findAll(idUser);
  }

  @Get(':id')
  @Public()
  // @Roles(Role.Admin, Role.User)
  async findOne(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationService.findOne(+id);
  }

  @Get(':userId')
  findAllUser(@Param('idUser')id:string){
    return this.reservationService.findAll(id);
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
