import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusOfReservationService } from './status-of-reservation.service';
import { CreateStatusOfReservationDto } from './dto/create-status-of-reservation.dto';
import { UpdateStatusOfReservationDto } from './dto/update-status-of-reservation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { StatusOfReservation } from './entities/status-of-reservation.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('status-of-reservation')
@Roles(Role.Admin)
export class StatusOfReservationController {
  constructor(
    private readonly statusOfReservationService: StatusOfReservationService,
  ) {}

  @Post()
  create(@Body() createStatusOfReservationDto: CreateStatusOfReservationDto) {
    return this.statusOfReservationService.create(createStatusOfReservationDto);
  }

  @Get()
  findAll() {
    return this.statusOfReservationService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOfReservationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusOfReservationDto: UpdateStatusOfReservationDto,
  ) {
    return this.statusOfReservationService.updateStatusOfReservation({
      ...updateStatusOfReservationDto,
      idStatus: Number(id),
    });
  }

  @Delete(':id')
  deleteStatusOfReservation(
    @Param('id') id: string,
  ): StatusOfReservation[] | any {
    return this.statusOfReservationService.deleteStatusOfReservation(
      Number(id),
    );
  }
}
