import {
    ConflictException,
  ForbiddenException,
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
import { log } from 'console';

// export class EmailAlreadyExistsException extends ConflictException {
//   constructor() {
//     super('Email already exists');
//   }
// }

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //---------------------------------------------------------------------------
  async registerUser({ fullname, email, password }: RegisterDto) {
    console.log({fullname});
    const user = await this.userService.getUserByEmail(email);
    if (user)
      throw new ConflictException(
        'Ya existe otro usuario registrado con el email: ' + email
      );

    const newUser = await this.userService.create({
      fullname,
      email,
      password
    });

    return newUser;
  }
  //---------------------------------------------------------------------------
  async login({ email, password }: LoginDto): Promise<any> {
    // async login({ email, password }: LoginDto): Promise<Record<string, string>> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Email inválido.\n El email proporcionado no se encuentra resitrado.');

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
  //---------------------------------------------------------------------------
  // TODO
  // definir aca? un metodo para diferenciar si que typo de usuario es
  // throw new ForbiddenException('Acceso denegado');

  //NotImplementedException
}
