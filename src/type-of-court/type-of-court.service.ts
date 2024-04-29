import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTypeOfCourtDto } from './dto/create-type-of-court.dto';
import { UpdateTypeOfCourtDto } from './dto/update-type-of-court.dto';
import { TypeOfCourt } from './entities/type-of-court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class TypeOfCourtService {

  private typeOfCourts: TypeOfCourt[] = [];


  constructor(@InjectRepository(TypeOfCourt) private readonly typeOfCourtRepository: Repository<TypeOfCourt>) { }

  public async create(createTypeOfCourtDto: CreateTypeOfCourtDto): Promise<TypeOfCourt> {
    try {
      let typeOfCourt: TypeOfCourt = await this.typeOfCourtRepository.save(new TypeOfCourt(
        createTypeOfCourtDto.name));
      if (typeOfCourt)
        return typeOfCourt;
      else
        throw new DOMException('No se pudo crear el TypeOFCourt :(');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion de typeOfCourt '+ error
      }, HttpStatus.NOT_FOUND);
    }

  }

  public async getAll(): Promise<TypeOfCourt[]> {
    try {
      this.typeOfCourts = await this.typeOfCourtRepository.find();
      if (this.typeOfCourts)
        return this.typeOfCourts
      else throw new Error('no se encuentran TypeOfCours');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :)" + error
      }, HttpStatus.NOT_FOUND)
    }

  }

  public async findOne(idTypeOfCourt: number): Promise<TypeOfCourt[]> {
    try {
      const criterio: FindOneOptions = { where:{ id: idTypeOfCourt }};
      let typeOfCourt: TypeOfCourt = await this.typeOfCourtRepository.findOne(criterio);
      this.typeOfCourts = [];
      if (typeOfCourt){
        this.typeOfCourts.push(typeOfCourt)
      }
      else throw new Error('no se encuentran TypeOfCourts');
      return this.typeOfCourts;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :" + error
      }, HttpStatus.NOT_FOUND)

    }
  }

  public async updateTypeOfCourt(TypeOfCourtDTO : UpdateTypeOfCourtDto) : Promise<TypeOfCourt> {
    try {
        let criterio : FindOneOptions = { where:{id:TypeOfCourtDTO.id}};
        let typeOfCourt : TypeOfCourt = await this.typeOfCourtRepository.findOne(criterio);
        if (!typeOfCourt)
           throw new DOMException('No se encuentra la typeOfCourt');
        else
           typeOfCourt.setName(TypeOfCourtDTO.name);
        typeOfCourt = await this.typeOfCourtRepository.save(typeOfCourt);
        return typeOfCourt;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'Error en la actualizacion de typeOfCourt '+error}, HttpStatus.NOT_FOUND);
     }
     }

     public async deleteTypeOfCourt(idTypeOfCourt:number) : Promise<boolean> {
      try {
         let criterio : FindOneOptions = {where:{id:idTypeOfCourt}};
         let typeOfCourt : TypeOfCourt = await this.typeOfCourtRepository.findOne(criterio);
         if (!typeOfCourt)
            throw new DOMException('No se encuentra la typeOfCourt');
         else
            await this.typeOfCourtRepository.delete(typeOfCourt.getIdTypeOfCourt());
         return (true)
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'Error en la eliminacion de typeOfCourt '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
