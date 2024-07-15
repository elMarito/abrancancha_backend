import { Controller, Body, Param, UseGuards, ParseIntPipe} from '@nestjs/common';
import { Get, Post, Patch, Delete} from '@nestjs/common';
import { StatusOfCourtService } from './status-of-court.service';
import { CreateStatusOfCourtDto } from './dto/create-status-of-court.dto';
import { UpdateStatusOfCourtDto } from './dto/update-status-of-court.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('status-of-court')
// @UseGuards(AuthGuard)
// @Roles(Role.Admin)
export class StatusOfCourtController {
  constructor(private readonly statusOfCourtService: StatusOfCourtService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStatusOfCourtDto: CreateStatusOfCourtDto) {
    return this.statusOfCourtService.create(createStatusOfCourtDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.statusOfCourtService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusOfCourtService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusOfCourtDto: UpdateStatusOfCourtDto,
  ) {
    return this.statusOfCourtService.update({
      ...updateStatusOfCourtDto,
      id: Number(id),
    });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statusOfCourtService.remove(+id);
  }
}
