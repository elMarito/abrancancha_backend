import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusOfReservationService } from './status-of-reservation.service';
import { CreateStatusOfReservationDto } from './dto/create-status-of-reservation.dto';
import { UpdateStatusOfReservationDto } from './dto/update-status-of-reservation.dto';

@Controller('status-of-reservation')
export class StatusOfReservationController {
  constructor(private readonly statusOfReservationService: StatusOfReservationService) {}

  @Post()
  create(@Body() createStatusOfReservationDto: CreateStatusOfReservationDto) {
    return this.statusOfReservationService.create(createStatusOfReservationDto);
  }

  @Get()
  findAll() {
    return this.statusOfReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOfReservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusOfReservationDto: UpdateStatusOfReservationDto) {
    return this.statusOfReservationService.update(+id, updateStatusOfReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusOfReservationService.remove(+id);
  }
}
