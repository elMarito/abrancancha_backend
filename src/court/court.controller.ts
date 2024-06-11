import { Controller, Body, Param, UseGuards } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('courts')
// @UseGuards(AuthGuard)
@Roles(Role.Admin)
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
    return this.courtService.updateCourt(+id, updateCourtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtService.remove(+id);
  }
}
