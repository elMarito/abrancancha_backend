import { Controller, Body, Query, Param, ParseIntPipe} from '@nestjs/common';
import { Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { QueryCourtDto } from './dto/query-court.dto';
import { Court } from './entities/court.entity';

@Controller('courts')
// @UseGuards(AuthGuard)
@Roles(Role.Admin)
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtService.create(createCourtDto);
  }

  @Get()
  @Public()
  findAll(@Query() params?:QueryCourtDto): Promise<Court[]> {
    return this.courtService.getAll(params);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courtService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtService.updateCourt(+id, updateCourtDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courtService.remove(+id);
  }
}
