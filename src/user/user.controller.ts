import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('users')
@Roles(Role.User)
// @UseGuards(AuthGuard, RoleGuard)
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll(Role.User);
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  // @Roles(Role.Admin)
  findOne(@Param('id') id: string)/* :User */ {
    return this.userService.findOne(+id);
  }

  @Get(':id/reservas')
  // o userWithReservations
  reservationsByUser(@Param('id') id : string) /* : User | any */ {
    // TODO
      // return this.userService.getByIdCompleto(id);
  }

  // @Put(':id')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
