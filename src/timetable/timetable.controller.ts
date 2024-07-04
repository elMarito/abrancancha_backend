import { Controller, Body, Param, UseGuards } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
// import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('timetables')
// @Roles(Role.Admin)
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTimetableDto: CreateTimetableDto) {
    return this.timetableService.create(createTimetableDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.timetableService.findAll();
  }

  // @Get('withSchedules')
  // @Public()
  // findAllwithSchedules() {
  //   return this.timetableService.findAllwithSchedules();
  // }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.timetableService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    return this.timetableService.update(+id, updateTimetableDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.timetableService.remove(+id);
  }
}
