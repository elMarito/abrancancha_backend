import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExceptionTimedateService } from './exception-timedate.service';
import { CreateExceptionTimedateDto } from './dto/create-exception-timedate.dto';
import { UpdateExceptionTimedateDto } from './dto/update-exception-timedate.dto';
import { ExceptionTimedate } from './entities/exception-timedate.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('exception-timedate')
@Roles(Role.Admin)
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
  findOne(@Param('id') id: number) {
    return this.exceptionTimedateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExceptionTimedateDto: UpdateExceptionTimedateDto) {
    return this.exceptionTimedateService.updateExceptionTimedate( {...updateExceptionTimedateDto,id:Number(id)});
  }

  @Delete(':id')
  eliminarExceptionTimeDate(@Param('id') id: string):ExceptionTimedate[]|any {
    return this.exceptionTimedateService.eliminarexceptionTimedate(Number(id));
  }
}
