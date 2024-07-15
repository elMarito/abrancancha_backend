import { Controller, Body, Param, UseGuards, ParseIntPipe} from '@nestjs/common';
import { Get, Post, Patch, Delete} from '@nestjs/common';
import { StatusOfReservationService } from './status-of-reservation.service';
import { CreateStatusOfReservationDto } from './dto/create-status-of-reservation.dto';
import { UpdateStatusOfReservationDto } from './dto/update-status-of-reservation.dto';
import { StatusOfReservation } from './entities/status-of-reservation.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('status-of-reservation')
// @Roles(Role.Admin)
export class StatusOfReservationController {
  constructor(
    private readonly statusOfReservationService: StatusOfReservationService,
  ) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStatusOfReservationDto: CreateStatusOfReservationDto) {
    return this.statusOfReservationService.create(createStatusOfReservationDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.statusOfReservationService.getAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusOfReservationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusOfReservationDto: UpdateStatusOfReservationDto,
  ) {
    return this.statusOfReservationService.updateStatusOfReservation({
      ...updateStatusOfReservationDto,
      idStatus: Number(id),
    });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  deleteStatusOfReservation(
    @Param('id', ParseIntPipe) id: number,
  ): StatusOfReservation[] | any {
    return this.statusOfReservationService.deleteStatusOfReservation(
      Number(id),
    );
  }
}
