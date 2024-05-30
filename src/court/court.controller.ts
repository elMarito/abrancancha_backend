import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('court')
@UseGuards(AuthGuard)
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtService.create(createCourtDto);
  }

  @Get()
  findAll() {
    return this.courtService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtService.updateCourt({...updateCourtDto , id:Number(id)});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtService.remove(+id);
  }
}
