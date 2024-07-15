import { Controller, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
// import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
// import { Auth } from 'src/auth/entities/auth.entity';

@Controller('club')
// @Roles(Role.Admin)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.clubService.getAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClubDto: UpdateClubDto) {
  return this.clubService.updateClub({...updateClubDto, id:Number(id)  });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  eliminarClub(@Param('id', ParseIntPipe) id: number): Club[]|any{
    return this.clubService.eliminarClub(Number(id))  
  }
}
