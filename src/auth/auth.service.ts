import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //---------------------------------------------------------------------------
  async registerUser({ fullname, email, password }: RegisterDto) {
    const user = await this.userService.getUserByEmail(email);
    if (user)
      throw new BadGatewayException(
        'Ya existe un usuario registrado con el email:' + email,
      );

    const newUser = await this.userService.create({
      fullname,
      email,
      password,
    });

    return newUser;
  }
  //---------------------------------------------------------------------------
  async login({ email, password }: LoginDto): Promise<any> {
  // async login({ email, password }: LoginDto): Promise<Record<string, string>> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Email invalido');

    const isPasswordValid = await bcryptjs.compare(
      password,
      user.getPasswordHash(),
    );
    if (!isPasswordValid) throw new UnauthorizedException('Password inválida');

    const payload = { sub: user.getId(), email: user.getEmail() };
    // const { getPasswordHash, ...result } = user;
    // return result;
    const accesToken = await this.jwtService.signAsync(payload);
    return {
      token: accesToken,
    };
  }
}
