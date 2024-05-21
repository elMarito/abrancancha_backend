import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import * as bcryptjs from 'bcryptjs';
import { QueryFailedError } from 'typeorm';
import {
  ServiceResponseOk,
  today,
  urlSafeHash,
  urlUnsafeHash,
} from 'src/utilities';
import { Role } from './role.enum';
import { User } from 'src/user/entities/user.entity';

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
    // console.log({fullname});
    // const user = await this.userService.getUserByEmail(email);
    // if (user)
    //   throw new ConflictException(
    //     'Ya existe otro usuario registrado con el email: ' + email
    //   );

    const newUser = await this.userService.create({
      fullname,
      email,
      password,
    });

    return newUser;
  }
  //---------------------------------------------------------------------------
  async login({ email, password }: LoginDto): Promise<any> {
    // async login({ email, password }: LoginDto): Promise<{ token: string }> {
    // async login({ email, password }: LoginDto): Promise<Record<string, string>> {
    const user: User = await this.userService.getUserByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        'Email inválido.\n El email proporcionado no se encuentra resitrado.',
      );

    const isPasswordValid = await bcryptjs.compare(
      password,
      user.getPasswordHash(),
    );
    if (!isPasswordValid) throw new UnauthorizedException('Password inválida');

    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
      role: user.isAdministrator() ? Role.Admin : Role.User,
      // role:  Role.Admin
    };
    // const payload = { sub: user.getId(), email: user.getEmail() };
    // const { getPasswordHash, ...result } = user;
    // return result;
    return { token: await this.jwtService.signAsync(payload) };
    // const accesToken = await this.jwtService.signAsync(payload);
    // return {
    //   token: accesToken,
    // };
  }
  //---------------------------------------------------------------------------
  async resetPassword(email: string): Promise<any> {
    // try {
    if (!email)
      throw new BadRequestException('El email proporcionado no es valido');
    const user = await this.userService.getUserByEmail(email);
    // console.log("++++",user);
    if (!user)
      throw new NotFoundException(
        'Email inválido.\n El email proporcionado no se encuentra resitrado.',
      );
    // if (!user) throw new UnauthorizedException('Email inválido.\n El email proporcionado no se encuentra resitrado.');
    // const payload = {
    //   sub: user.getId(),
    //   email: user.getEmail(),
    //   expiration: today(),
    // };
    const payload = user.getId() + user.getEmail() + today();
    // const resetToken = await this.jwtService.signAsync(payload);
    const resetToken = await bcryptjs.hash(payload, 10);
    const safehash = urlSafeHash(resetToken);
    user.setPasswordHash(safehash);
    const response = await this.userService.changePassword(user);
    return ServiceResponseOk(
      'La contraseña a sido reseteada y el token es valido hasta medianoche.',
      { resetToken: safehash },
    );
    // return { ...response, resetToken: safehash };

    // } catch (error) {
    //   if (
    //     error instanceof BadRequestException ||
    //     error instanceof NotFoundException
    //   ) {
    //     throw error;
    //   } else if (error instanceof QueryFailedError) {
    //     throw new InternalServerErrorException(
    //       'Error en la consulta a la base de datos',
    //     );
    //   } else {
    //     // console.error('Error borrando el usuario:', error);
    //     throw new Error('Ocurrio un error inesperado');
    //   }
    // }
  }
  //---------------------------------------------------------------------------
  async changePassword(resetToken: string, newPassword: string) {
    // console.log({fullname});
    const user = await this.userService.getUserByResetToken(resetToken);
    if (!user)
      throw new NotFoundException(
        'El link de reseteo ya no es válido, debes volver a generarlo',
      );
    const paylodString = user.getId() + user.getEmail() + today();
    // const paylodString = JSON.stringify( payload);
    // const newResetTokenUnsafeUrl = await bcryptjs.hash(paylodString, 10);
    // const newResetToken = urlSafeHash(newResetTokenUnsafeUrl);

    const isPasswordValid = await bcryptjs.compare(
      paylodString,
      urlUnsafeHash(user.getPasswordHash()),
    );
    if (!isPasswordValid)
      throw new UnauthorizedException(
        'El link de reseteo a caducado, genere uno nuevo',
      );

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.setPasswordHash(hashedPassword);
    const response = await this.userService.changePassword(user);
    return response;
  }
  //---------------------------------------------------------------------------
  // TODO
  // definir aca? un metodo para diferenciar si que typo de usuario es
  // throw new ForbiddenException('Acceso denegado');

  //NotImplementedException
}
