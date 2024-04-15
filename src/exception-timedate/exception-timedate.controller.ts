import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExceptionTimedateService } from './exception-timedate.service';
import { CreateExceptionTimedateDto } from './dto/create-exception-timedate.dto';
import { UpdateExceptionTimedateDto } from './dto/update-exception-timedate.dto';

@Controller('exception-timedate')
export class ExceptionTimedateController {
  constructor(private readonly exceptionTimedateService: ExceptionTimedateService) {}

  @Post()
  create(@Body() createExceptionTimedateDto: CreateExceptionTimedateDto) {
    return this.exceptionTimedateService.create(createExceptionTimedateDto);
  }

  @Get()
  findAll() {
    return this.exceptionTimedateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionTimedateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExceptionTimedateDto: UpdateExceptionTimedateDto) {
    return this.exceptionTimedateService.update(+id, updateExceptionTimedateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exceptionTimedateService.remove(+id);
  }
}
