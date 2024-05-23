import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Admin } from 'typeorm';

@Injectable()
export class AdministratorService {
  private administrators: Administrator[] = [];
 
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository:Repository<Administrator>
    // ,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}
  //---------------------------------------------------------------------------
  public async create(CreateAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    try {
      let administrator: Administrator = await this.administratorRepository.save(new Administrator(
        CreateAdministratorDto.idUser));
      if (administrator)
        return administrator;
      else
        throw new Error('No se pudo crear el administrator :(');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion de administrator '+ error
      }, HttpStatus.NOT_FOUND);
    }

  }
  //---------------------------------------------------------------------------
  public async getAll(): Promise<Administrator[]> {
    try {
      this.administrators = await this.administratorRepository.find();
      if (this.administrators)
        return this.administrators
      else throw new Error('no se encuentran TypeOfCours');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :)" + error
      }, HttpStatus.NOT_FOUND)
    }

  }
  //---------------------------------------------------------------------------
  public async findOne(idAdministrator: number): Promise<Administrator[]> {
    try {
      const criterio: FindOneOptions = { where:{ id: idAdministrator }};
      let administrator: Administrator = await this.administratorRepository.findOne(criterio);
      this.administrators = [];
      if (administrator){
       
        this.administrators.push(administrator)
      }
      else throw new Error('no se encuentran administrators');
      return this.administrators;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :" + error
      }, HttpStatus.NOT_FOUND)

    }
  }
  //---------------------------------------------------------------------------
  public async updateAdministrator(administratorDTO : UpdateAdministratorDto) : Promise<Administrator> {
    try {
        let criterio : FindOneOptions = { where:{id:administratorDTO.idUser}};
        let administrator : Administrator = await this.administratorRepository.findOne(criterio);
        if (!administrator)
           throw new Error('No se encuentra la administrator');
        else
           administratorDTO.idUser;
        administrator = await this.administratorRepository.save(administrator);
        return administrator;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'Error en la actualizacion de administrator '+error}, HttpStatus.NOT_FOUND);
     }
     }
     //---------------------------------------------------------------------------
     public async deleteAdministrator(idAdministrator:number) : Promise<string> {
      try {
         let criterio : FindOneOptions = {where:{id:idAdministrator}};
         let administrator : Administrator = await this.administratorRepository.findOne(criterio);
         if (!administrator)
            throw new Error('No se encuentra la administrator');
         else
            await this.administratorRepository.delete(administrator.getId());
         return ("El administrador fue eliminado correctamente. ")
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'Error en la eliminacion de administrator '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
