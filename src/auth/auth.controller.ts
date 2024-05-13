import { Controller, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() register: RegisterDto): Promise<User> {
    // console.log("controller",{register});

    return this.authService.registerUser(register);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
    // signIn(@Body() signInDto: Record<string, any>) {
    // 	return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // @HttpCode(HttpStatus.OK)
  @Patch('reset')
  resetPassword(@Body() data: any) {
    return this.authService.resetPassword(data.email);
  }

  @Patch('reset/:token')
  // changePassword(@Body() newPassword: String) {
  async changePassword(
    @Param('token') token: string,
    @Body() data: UpdateAuthDto,
  ) {
    // async changePassword(@Param('token') token: string, @Body() data: any) {
    return this.authService.changePassword(token, data.newPassword);
    // const originalHash = '$2a$10$uUbvjZvgpYWqN5Pf5sDULeOZBnPReOTBz7tO7QeEU0wEPqzsYJA42';
    // return this.authService.changePassword(originalHash, data.newPassword);
  }
}
