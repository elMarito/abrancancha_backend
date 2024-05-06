import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExceptionTimedateService } from './exception-timedate.service';
import { CreateExceptionTimedateDto } from './dto/create-exception-timedate.dto';
import { UpdateExceptionTimedateDto } from './dto/update-exception-timedate.dto';
import { ExceptionTimedate } from './entities/exception-timedate.entity';

@Controller('exception-timedate')
export class ExceptionTimedateController {
  constructor(private readonly exceptionTimedateService: ExceptionTimedateService) {}

  @Post()
  create(@Body() createExceptionTimedateDto: CreateExceptionTimedateDto) {
    return this.exceptionTimedateService.create(createExceptionTimedateDto);
  }

  @Get()
  findAll() {
    return this.exceptionTimedateService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionTimedateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExceptionTimedateDto: UpdateExceptionTimedateDto) {
    return this.exceptionTimedateService.updateException( {...updateExceptionTimedateDto,id:Number(id)});
  }

  @Delete(':id')
  eliminarException(@Param('id') id: string):ExceptionTimedate[]|any {
    return this.exceptionTimedateService.eliminarException(Number(id));
  }
}
