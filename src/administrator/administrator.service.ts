import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Admin, FindManyOptions, IsNull, Not } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AdministratorService {
  private administrators: User[] = [];

  constructor(
    private userService: UserService,
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  //---------------------------------------------------------------------------
  public async create(
    CreateAdministratorDto: CreateAdministratorDto,
  ): Promise<Administrator> {
    try {
      let user: User = await this.userService.create(CreateAdministratorDto);
      if (!user) throw new Error('No se pudo crear el usuario :(');
      let administrator: Administrator =
        await this.administratorRepository.save(
          new Administrator(user.getId()),
        );
      // let administrator: Administrator = await this.administratorRepository.save(new Administrator(
      //   CreateAdministratorDto.idUser));
      if (administrator) return administrator;
      // if (administrator) return user;
      else throw new Error('No se pudo crear el administrator :(');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la creacion de administrator ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async getAll(): Promise<User[]> {
    try {
      // const criterio: FindOneOptions = { where: { id: id } };
      const criterio: FindManyOptions = {
        relations: ['administrator'],
        relationLoadStrategy: "query",
        where: { administrator:{ id: Not( IsNull())} },
        // select:{administrator:{id:false, idUser:false}}
      };
      // where: { administrator: { idUser: () => `user.id` } },
      // const criterio: FindManyOptions = { relations: ['Administrators'] };
      this.administrators = await this.userRepository.find(criterio);
      if (this.administrators) return this.administrators;
      else throw new Error('no se encuentran Administradores');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda :)' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async getAllRaw(): Promise<Administrator[]> {
    try {
      // this.administrators = await this.administratorRepository.find();
      let administrators = await this.administratorRepository.find();
      if (this.administrators) return administrators;
      else throw new Error('no se encuentran TypeOfCours');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda :)' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async findOne(idAdministrator: number): Promise<Administrator> {
    try {
      const criterio: FindOneOptions = { where: { id: idAdministrator } };
      let administrator: Administrator =
        await this.administratorRepository.findOne(criterio);
      // this.administrators = [];
      if (administrator) {
        // this.administrators.push(administrator);
      } else throw new Error('no se encuentran administrators');
      return administrator;
      // return this.administrators;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda :' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async updateAdministrator(
    idUser: number,
    administratorDTO: UpdateAdministratorDto,
  ): Promise<Administrator> {
    try {
      let criterio: FindOneOptions = { where: { id: idUser } };
      let administrator: Administrator =
        await this.administratorRepository.findOne(criterio);
      if (!administrator) throw new Error('No se encuentra la administrator');
     // else idUser; Aqui corregi y probablemente halla un error typeOfCourt.setName(TypeOfCourtDTO.name);//
      administrator = await this.administratorRepository.save(administrator);
      return administrator;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la actualizacion de administrator ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async deleteAdministrator(idadministrator: number): Promise<string> {
    try {
      let criterio: FindOneOptions = { where: { id: idadministrator } };
      let administrator: Administrator =
        await this.administratorRepository.findOne(criterio);
      if (!administrator) throw new Error('No se encuentra la administrator');
      else await this.administratorRepository.delete(administrator.getId());
      return 'El administrador fue cambiado correctamente. ';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la eliminacion de administrator ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
