import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('club')

@Roles(Role.Admin)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto);
  }

  @Get()
  findAll() {
    return this.clubService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
  return this.clubService.updateClub({...updateClubDto, id:Number(id)  });
  }

  @Delete(':id')
  eliminarClub(@Param('id') id:string): Club[]|any{
    return this.clubService.eliminarClub(Number(id))
  
  }
}
