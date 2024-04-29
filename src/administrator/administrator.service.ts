import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, FindOneOptions, Admin } from 'typeorm';

// @Injectable()
// export class AdministratorService {
//   create(createAdministratorDto: CreateAdministratorDto) {
//     return 'This action adds a new administrator';
//   }

//   findAll() {
//     return `This action returns all administrator`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} administrator`;
//   }

//   update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
//     return `This action updates a #${id} administrator`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} administrator`;
//   }
@Injectable()
export class AdministratorService {

  private administrators: Administrator[] = [];


  constructor(@InjectRepository(Administrator) private readonly administratorRepository: Repository<Administrator>) { }

  public async create(CreateAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    try {
      let administrator: Administrator = await this.administratorRepository.save(new Administrator(
        CreateAdministratorDto.idUser));
      if (administrator)
        return administrator;
      else
        throw new DOMException('No se pudo crear el administrator :(');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion de administrator '+ error
      }, HttpStatus.NOT_FOUND);
    }

  }

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

  public async updateAdministrator(administratorDTO : UpdateAdministratorDto) : Promise<Administrator> {
    try {
        let criterio : FindOneOptions = { where:{id:administratorDTO.idUser}};
        let administrator : Administrator = await this.administratorRepository.findOne(criterio);
        if (!administrator)
           throw new DOMException('No se encuentra la administrator');
        else
           administratorDTO.idUser;//Aqui corregi y probablemente halla un error typeOfCourt.setName(TypeOfCourtDTO.name);//
        administrator = await this.administratorRepository.save(administrator);
        return administrator;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'Error en la actualizacion de administrator '+error}, HttpStatus.NOT_FOUND);
     }
     }

     public async deleteAdministrator(idadministrator:number) : Promise<boolean> {
      try {
         let criterio : FindOneOptions = {where:{id:idadministrator}};
         let administrator : Administrator = await this.administratorRepository.findOne(criterio);
         if (!administrator)
            throw new DOMException('No se encuentra la administrator');
         else
            await this.administratorRepository.delete(administrator.getId());
         return (true)
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'Error en la eliminacion de administrator '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
