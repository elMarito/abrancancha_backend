import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusOfCourtService } from './status-of-court.service';
import { CreateStatusOfCourtDto } from './dto/create-status-of-court.dto';
import { UpdateStatusOfCourtDto } from './dto/update-status-of-court.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('status-of-court')
@UseGuards(AuthGuard)
export class StatusOfCourtController {
  constructor(private readonly statusOfCourtService: StatusOfCourtService) {}

  @Post()
  create(@Body() createStatusOfCourtDto: CreateStatusOfCourtDto) {
    return this.statusOfCourtService.create(createStatusOfCourtDto);
  }

  @Get()
  findAll() {
    return this.statusOfCourtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOfCourtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusOfCourtDto: UpdateStatusOfCourtDto) {
    return this.statusOfCourtService.update({...updateStatusOfCourtDto , id:Number(id)});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusOfCourtService.remove(+id);
  }
}
