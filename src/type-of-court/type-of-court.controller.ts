import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeOfCourtService } from './type-of-court.service';
import { CreateTypeOfCourtDto } from './dto/create-type-of-court.dto';
import { UpdateTypeOfCourtDto } from './dto/update-type-of-court.dto';

@Controller('type-of-court')
export class TypeOfCourtController {
  constructor(private readonly typeOfCourtService: TypeOfCourtService) {}

  @Post()
  create(@Body() createTypeOfCourtDto: CreateTypeOfCourtDto) {
    return this.typeOfCourtService.create(createTypeOfCourtDto);
  }

  @Get()
  findAll() {
    return this.typeOfCourtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfCourtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeOfCourtDto: UpdateTypeOfCourtDto) {
    return this.typeOfCourtService.update(+id, updateTypeOfCourtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfCourtService.remove(+id);
  }
}
