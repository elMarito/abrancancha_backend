import {  BadRequestException,  ConflictException} from '@nestjs/common';
import {  GoneException,  HttpException,  HttpStatus} from '@nestjs/common';
import {  Injectable,  InternalServerErrorException} from '@nestjs/common';
import {  NotFoundException,} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {  FindManyOptions,  FindOneOptions} from 'typeorm';
import {  QueryFailedError,  Repository} from 'typeorm';
import { StatusOfUser } from 'src/status-of-user/entities/status-of-user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import * as bcryptjs from 'bcryptjs';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';

const ERROR_ENTITY = 'usuario';
const ERROR_ENTITY_LOWER = `el ${ERROR_ENTITY}`;
const ERROR_ENTITY_UCASE = `El ${ERROR_ENTITY}`;
const ERROR_ENTITIES = 'usuarios';
const ERROR_MSG = {
  NOT_FOUND: `${ERROR_ENTITY_UCASE} no se encuentra.`,
  NOT_FOUND_ANY: `No se encuentran ${ERROR_ENTITIES}.`,
  REPEATED: `${ERROR_ENTITY_UCASE} ya se encuentra.`,
  CANT_CREATE: `No se pudo crear ${ERROR_ENTITY_LOWER}`,
  // CANT_UPDATE: `No hay datos para modificar ${ERROR_ENTITIES}.`,
  // CANT_DELETE: `No hay datos para eliminar ${ERROR_ENTITIES}.`,
  NO_DATA_4: {
    CREATE: `No hay datos para crear ${ERROR_ENTITIES}.`,
    UPDATE: `No hay datos para modificar ${ERROR_ENTITIES}.`,
    DELETE: `No hay datos para eliminar ${ERROR_ENTITIES}.`,
  },
  INVALID_ID: `El ID de ${ERROR_ENTITY} provisto no es válido.`,
  INVALID_DATA_4: {
    CREATE: `Los datos para crear ${ERROR_ENTITY_LOWER} no son validos`,
    UPDATE: `Los datos para modificar ${ERROR_ENTITY_LOWER} no son validos`,
  },
};

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Reservation) //**quizas esto no va */
    // private readonly reservationRepository: Repository<Reservation>,
  ) {}
  //---------------------------------------------------------------------------
  async getUserByEmail(email: string): Promise<User> {
    // try {
    const criteria: FindOneOptions = { where: { email: email } };
    const user: User = await this.userRepository.findOne(criteria);
    // if (user)
    return user;
    // throw new NotFoundException(
    //   'Error buscando usuario por email: \n' +
    //   ERROR_MSG.NOT_FOUND,
    //   `No existe un ${ERROR_ENTITY} registrado con el email: ` + email,
    // );
    // throw new Error( 'Error buscando usuario por email: \n' +"Error inesperado");
    // } catch (error) {
    //   if (error instanceof QueryFailedError) {
    //     throw new InternalServerErrorException(
    //       'Error buscando usuario por email: \n' +
    //       'Error en la consulta a la base de datos',
    //     );
    //   }
    //   throw new NotFoundException(
    //     ERROR_MSG.NOT_FOUND,
    //     `No existe un ${ERROR_ENTITY} registrado con el email: ` + email,
    //   );
    // }
  }
  //---------------------------------------------------------------------------
  public async create(datos: CreateUserDto): Promise<User> {
    try {
      // if (datos) //<---esto si devuelve Promise<string>
      // if (!datos.email) throw new Error(ERROR_MSG.INVALID_DATA_4.CREATE+"\nFaltó proporcionar el email");

      // if (datos.email)
      if (await this.existUserEmail(datos.email))
        throw new ConflictException(
          'Error: Datos repetidos\n',
          ERROR_MSG.REPEATED +
            '\nYa existe otro usuario registrado con el email: ' +
            datos.email,
        );

      const hashedPassword = await bcryptjs.hash(datos.password, 10);
      let user: User = await this.userRepository.save(
        new User(
          datos.fullname,
          hashedPassword,
          datos.email,
          datos.phone,
          datos.avatar,
        ),
      );

      if (user) return user;
      throw new Error('Error creando el usuario: \n' + 'Error inesperado');
      // if (user.getId()) return user;
      // else throw new Error(ERROR_MSG.CANT_CREATE);
      //
      // else throw new Error(ERROR_MSG.INVALID_DATA_4.CREATE);

      // else throw new Error(ERROR_MSG.NO_DATA_4.CREATE);
      // return 'ok';
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'Error: creando el usuario \n',
          'Error en la consulta a la base de datos',
        );
      } else return error;
    }
  }
  //---------------------------------------------------------------------------
  public async findAll(): Promise<User[]> {
    try {
      // const criterio: FindManyOptions = { relations: ['StatusOfUser','Reservation','Administrator'] };
      // this.users = await this.userRepository.find(criterio);
      this.users = await this.userRepository.find();
      if (this.users) return this.users;
      throw new NotFoundException(
        'Error en la busqueda: ',
        ERROR_MSG.NOT_FOUND_ANY,
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'Error en la busqueda: ',
          'Error en la consulta a la base de datos',
        );
      }
      throw error;
    }
  }
  //---------------------------------------------------------------------------
  // async findOne2(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.getFullname() === username);
  // }
  //---------------------------------------------------------------------------
  public async findOne(idUser: number): Promise<User[]> {
    try {
      // const criterio: FindOneOptions = {relations: ['StatusOfUser','Reservation','Administrator'] , where: { id: idUser } };
      const criterio: FindOneOptions = { where: { id: idUser } };
      let user: User = await this.userRepository.findOne(criterio);

      this.users = [];
      if (user) this.users.push(user);
      else throw new Error(ERROR_MSG.NOT_FOUND);
      return this.users;
    } catch (error) {
      // throw new NotFoundException(ERROR_MSG.NOT_FOUND);
      // throw new NotFoundException(ERROR_MSG.NOT_FOUND);
      throw new NotFoundException(
        'Error en la busqueda: \n' + ERROR_MSG.NOT_FOUND,
        {
          cause: new Error('Error en la busqueda de usuario ' + idUser + ' : '),
          description: 'Some error description',
        },
      );
    }
  }
  //---------------------------------------------------------------------------
  public async changePassword(user: User): Promise<ResponseObject> {
    // user.setPasswordHash(resetToken);
    const userUpdated: User = await this.userRepository.save(user);
    return ServiceResponseOk('La contraseña a sido actualizada.');
  }
  //---------------------------------------------------------------------------
  public async update(
    idUser: number,
    datos: UpdateUserDto,
  ): Promise<ResponseObject> {
    try {
      if (!idUser) throw new BadRequestException(ERROR_MSG.INVALID_ID);
      if (!datos) throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);
      // if (!datos.fullname) throw new Error(ERROR_MSG.INVALID_DATA_4.UPDATE);
      // const userExists = await this.existUserId(idUser);
      // if (!userExists) throw new GoneException(ERROR_MSG.NOT_FOUND);

      // const criterio: FindOneOptions = { where: { id: idUser } };
      // let user: User = await this.userRepository.findOne(criterio);
      let user: User = await this.getUserById(idUser);

      if (user == null) throw new GoneException(ERROR_MSG.NOT_FOUND);

      //si modifico el email, chequear que no ponga un email de otro
      if (datos.email && user.getEmail() !== datos.email) {
        // console.log(user.getEmail(),datos.email);
        const otherUser: User = await this.getUserByEmail(datos.email);
        if (otherUser && otherUser.getId() != idUser)
          throw new ConflictException(
            'el email elegido pertenece a otro usuario.',
          );
      }
      // const { password, ...userNoPassword } = datos;
      // let user2: User = new User(datos)

      user.setFullname(datos.fullname);
      user.setEmail(datos.email);
      user.setPhone(datos.phone);
      user.setAvatar(datos.avatar);
      const userUpdated: User = await this.userRepository.save(user);
      //else
      //  throw new Error(ERROR_MSG.INVALID_DATA_4.UPDATE);
      return ServiceResponseOk(
        `${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
        userUpdated,
      );
    } catch (error) {
      // return error;
      if (
        error instanceof BadRequestException ||
        error instanceof GoneException
      ) {
        throw error;
      } else if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'Error en la consulta a la base de datos',
        );
      } else {
        // console.error('Error borrando el usuario:', error);
        // throw new Error('Ocurrio un error inesperado');
        throw error;
      }
    }
  }
  //---------------------------------------------------------------------------
  // public async remove(id: number): Promise<string> {
  public async remove(id: number): Promise<ResponseObject> {
    try {
      if (!id) throw new BadRequestException(ERROR_MSG.NO_DATA_4.DELETE);

      const userExists = await this.existUserId(id);
      if (!userExists) throw new GoneException(ERROR_MSG.NOT_FOUND);

      await this.userRepository.delete(id);

      return ServiceResponseOk('Usuario borrado exitosamente.');
      // return {status: true, messagge: 'Usuario borrado exitosamente.'};
    } catch (error) {
      // return error.message;
      if (
        error instanceof BadRequestException ||
        error instanceof GoneException
      ) {
        throw error;
      } else if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'Error en la consulta a la base de datos',
        );
      } else {
        // console.error('Error borrando el usuario:', error);
        throw new Error('Ocurrio un error inesperado');
      }
    }
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private async getUserById(idUser: number): Promise<User> {
    const criterio: FindOneOptions = { where: { id: idUser } };
    return await this.userRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  public async getUserByResetToken(passwordHash:string): Promise<User> {
    const criterio: FindOneOptions = { where: { passwordHash: passwordHash } };
    return await this.userRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async existUserId(idUser: number): Promise<boolean> {
    const criterio: FindOneOptions = { where: { id: idUser } };
    const user: User = await this.userRepository.findOne(criterio);
    return user != null;
  }
  //---------------------------------------------------------------------------
  private async existUserEmail(email: string): Promise<boolean> {
    const criterio: FindOneOptions = { where: { email: email } };
    const user: User = await this.userRepository.findOne(criterio);
    return user != null;
  }
  //---------------------------------------------------------------------------
  // metodo para modificar contraseña?

  //---------------------------------------------------------------------------
  // private async isAdministrator(idUser: number): Promise<boolean> {
  //   let criterio: FindOneOptions = { where: { id: idUser } };
  //   let user: User = await this.userRepository.findOne(criterio);
  //   return user.administrator != null;
  // }
}
