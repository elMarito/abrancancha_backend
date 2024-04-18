import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  FindManyOptions,
  FindOneOptions,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { StatusOfUser } from 'src/status-of-user/entities/status-of-user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation) //**quizas esto no va */
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  //---------------------------------------------------------------------------
  async getUserByEmail(email: string): Promise<User> {
    try {
      const criteria: FindOneOptions = { where: { email: email } };
      const user: User = await this.userRepository.findOne(criteria);
      if (user) return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          {
            stattus: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error en la consulta a la base de datos',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No existe un usuario registrado con el email:' + email,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async create(datos: CreateUserDto): Promise<User> {
    try {
      // if (datos) //<---esto si devuelve Promise<string>
      if (datos.fullname)
        if (await this.existUserName(datos.fullname)) {
          // if (datos.id && datos.fullname)
          throw new Error('El usuario ya se encuentra.');
        } else {
          const hashedPassword = await bcryptjs.hash(datos.password, 10);
          let user: User = await this.userRepository.save(
            new User(
              datos.fullname,
              hashedPassword,
              datos.email,
              // datos.phone,
              // datos.avatar,
            ),
          );

          if (user.getId()) return user;
          else throw new Error('No se pudo crear usuario');
        }
      else throw new Error('Los datos para crear usuario no son validos');
      // else throw new Error('No hay datos para crear usuario');
      // return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  //---------------------------------------------------------------------------
  public async findAll(): Promise<User[]> {
    try {
      // const criterio: FindManyOptions = { relations: ['StatusOfUser','Reservation','Administrator'] };
      // this.users = await this.userRepository.find(criterio);
      this.users = await this.userRepository.find();
      if (this.users) return this.users;
      throw new Error('No se encuentran usuarios.');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  async findOne2(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.getFullname() === username);
  }
  //---------------------------------------------------------------------------
  public async findOne(idUser: number): Promise<User[]> {
    try {
      // const criterio: FindOneOptions = {relations: ['StatusOfUser','Reservation','Administrator'] , where: { id: idUser } };
      const criterio: FindOneOptions = { where: { id: idUser } };
      let user: User = await this.userRepository.findOne(criterio);

      this.users = [];
      if (user) this.users.push(user);
      else throw new Error('El usuario no se encuentra.');
      return this.users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de usuario ' + idUser + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async update(idUser: number, datos: UpdateUserDto): Promise<string> {
    try {
      if (datos)
        if (datos.fullname)
          if (await this.existUserId(idUser)) {
            let criterio: FindOneOptions = { where: { id: idUser } };
            let user: User = await this.userRepository.findOne(criterio);
            user.setFullname(datos.fullname);
            await this.userRepository.save(user);
          } else throw new Error('El usuario no se encuentra.');
        else throw new Error('Los datos para modificar usuario no son validos');
      else throw new Error('No hay datos para modificar usuarios');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  //---------------------------------------------------------------------------
  public async remove(id: number): Promise<string> {
    try {
      if (id)
        if (await this.existUserId(id)) {
          await this.userRepository.delete(id);
        } else throw new Error('El usuario no se encuentra.');
      else throw new Error('No hay datos para eliminar usuarios');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  //---------------------------------------------------------------------------
  private async existUserId(idUser: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { id: idUser } };
    let user: User = await this.userRepository.findOne(criterio);
    return user != null;
  }
  //---------------------------------------------------------------------------
  private async existUserName(name: string): Promise<boolean> {
    let criterio: FindOneOptions = { where: { fullname: name } };
    let user: User = await this.userRepository.findOne(criterio);
    return user != null;
  }
}
