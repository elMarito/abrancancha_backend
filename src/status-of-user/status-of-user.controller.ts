import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusOfUserService } from './status-of-user.service';
import { CreateStatusOfUserDto } from './dto/create-status-of-user.dto';
import { UpdateStatusOfUserDto } from './dto/update-status-of-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('status-of-user')
// @UseGuards(AuthGuard)
@Roles(Role.Admin)
export class StatusOfUserController {
  constructor(private readonly statusOfUserService: StatusOfUserService) {}

  @Post()
  create(@Body() createStatusOfUserDto: CreateStatusOfUserDto) {
    return this.statusOfUserService.create(createStatusOfUserDto);
  }

  @Get()
  findAll() {
    return this.statusOfUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOfUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusOfUserDto: UpdateStatusOfUserDto) {
    return this.statusOfUserService.update({... updateStatusOfUserDto, id:Number(id)});
  }

  @Delete(':id')
  remove(@Param('id') id: number)  {
    return this.statusOfUserService.remove(+id);
  }
}
