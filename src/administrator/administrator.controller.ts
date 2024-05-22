import { Controller,  Get,  Post,  Body,  Patch,  Param,  Delete} from '@nestjs/common';
import { UseGuards} from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { UserService } from 'src/user/user.service';

@Controller('administrators')
// @UseGuards(AuthGuard)
@Roles(Role.Admin)
// @UseGuards(AuthGuard, RoleGuard)
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService
    ,private readonly userService: UserService

  ) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  findAll() {
    // return this.administratorService.getAll();
    return this.userService.findAll(Role.Admin)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdministratorDto: UpdateAdministratorDto,
  ) {
    return this.administratorService.updateAdministrator(
      +id,
      updateAdministratorDto,
    );
    // return this.administratorService.updateAdministrator({...updateAdministratorDto , idUser:Number(id)});
  }

  @Delete(':id')
  private eliminaradministrator(
    @Param('id') id: string,
  ): Administrator[] | any {
    return this.administratorService.deleteAdministrator(Number(id));
  }
}
