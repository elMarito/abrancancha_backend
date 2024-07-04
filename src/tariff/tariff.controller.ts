import { Controller, Body, Param, UseGuards } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { Tariff } from './entities/tariff.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('tariffs')
// @UseGuards(AuthGuard)
// @Roles(Role.Admin)
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.tariffService.getAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.tariffService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffService.updateTariff({
      ...updateTariffDto,
      id: Number(id),
    });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  deleteTariff(@Param('id') id: number): Tariff[] | any {
    return this.tariffService.deleteTariff(id);
  }
}
