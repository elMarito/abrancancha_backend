import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from . /users/users . service '

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
//   async registerUser(username: string, pass: string): RegisterDto {
//     const newUser = await this.usersService.create({});
// return newUser;
//   }
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne2(username);

    if (user?.getPasswordHash() !== pass) throw new UnauthorizedException();
    const { getPasswordHash, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne2(username);

    if (user?.getPasswordHash() !== pass) throw new UnauthorizedException();

    //----------------
    // const isPasswordValid = await bcryptjs.compare(password,user.getPassword()
    // if (!isPasswordValid) throw new UnauthorizedException("Password Invalido")
      
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.getId()
      , name: user.getFullname()
      , email: user.getEmail() };
    return { access_token: await this.jwtService.signAsync(payload) };
    //-------------
  }
  //   create(createAuthDto: CreateAuthDto) {
  //     return 'This action adds a new auth';
  //   }

  //   findAll() {
  //     return `This action returns all auth`;
  //   }

  //   findOne(id: number) {
  //     return `This action returns a #${id} auth`;
  //   }

  //   update(id: number, updateAuthDto: UpdateAuthDto) {
  //     return `This action updates a #${id} auth`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} auth`;
  //   }
  // }
}
