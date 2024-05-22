import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeOfCourtService } from './type-of-court.service';
import { CreateTypeOfCourtDto } from './dto/create-type-of-court.dto';
import { UpdateTypeOfCourtDto } from './dto/update-type-of-court.dto';
import { TypeOfCourt } from './entities/type-of-court.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('type-of-court')
@UseGuards(AuthGuard)
export class TypeOfCourtController {
  constructor(private readonly typeOfCourtService: TypeOfCourtService) {}

  @Post()
  create(@Body() createTypeOfCourtDto: CreateTypeOfCourtDto)  {
    return this.typeOfCourtService.create(createTypeOfCourtDto);
  }

  @Get()
  findAll() {
    return this.typeOfCourtService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfCourtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeOfCourtDto: UpdateTypeOfCourtDto) {
    return this.typeOfCourtService.updateTypeOfCourt( {...updateTypeOfCourtDto , id:Number(id)});
  }

  @Delete(':id')
   eliminartypeOfCourt(@Param('id') id:string): TypeOfCourt[]|any {
return this.typeOfCourtService.eliminarTypeOfCourt(Number(id))
  }
}
