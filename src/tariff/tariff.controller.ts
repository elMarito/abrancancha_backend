import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { Tariff } from './entities/tariff.entity';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tariffs')
// @UseGuards(AuthGuard)
@Roles(Role.Admin)
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Post()
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get()
  findAll() {
    return this.tariffService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tariffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffService.updateTariff({...updateTariffDto , id:Number(id)});
  }

  @Delete(':id')
    private deleteTariff(@Param('id') id : number) : Tariff[] | any {
        return this.tariffService.deleteTariff(id);        
    }
}
