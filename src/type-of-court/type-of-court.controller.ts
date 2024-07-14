import { Controller, Body, Param, UseGuards } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { TypeOfCourtService } from './type-of-court.service';
import { CreateTypeOfCourtDto } from './dto/create-type-of-court.dto';
import { UpdateTypeOfCourtDto } from './dto/update-type-of-court.dto';
import { TypeOfCourt } from './entities/type-of-court.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('type-of-court')
// @Roles(Role.Admin)
export class TypeOfCourtController {
  constructor(private readonly typeOfCourtService: TypeOfCourtService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTypeOfCourtDto: CreateTypeOfCourtDto) {
    return this.typeOfCourtService.create(createTypeOfCourtDto);
  }

  @Get()
  @Public()
  // @Roles(Role.Admin, Role.User)
  findAll() {
    return this.typeOfCourtService.getAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.typeOfCourtService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateTypeOfCourtDto: UpdateTypeOfCourtDto,
  ) {
    return this.typeOfCourtService.updateTypeOfCourt({
      ...updateTypeOfCourtDto,
      id: Number(id),
    });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  eliminartypeOfCourt(@Param('id') id: string): TypeOfCourt[] | any {
    return this.typeOfCourtService.eliminarTypeOfCourt(Number(id));
  }
}
