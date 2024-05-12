import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('administrator')
@UseGuards(AuthGuard)
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  findAll() {
    return this.administratorService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.updateAdministrator({...updateAdministratorDto , idUser:Number(id)});
  }

  @Delete(':id')
  private eliminaradministrator(@Param('id') id:string): Administrator[]|any {
    return this.administratorService.deleteAdministrator(Number(id))
  }
}
