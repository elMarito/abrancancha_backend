import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class CourtService {

  private court :Court []=[];

  constructor(@InjectRepository(Court)private readonly courtRepository:Repository<Court>){}

  public async create(createCourtDto: CreateCourtDto): Promise<Court> {
    try {
      let court: Court = await this.courtRepository.save(new Court(
        createCourtDto.numb,createCourtDto.name,createCourtDto.idType,createCourtDto.idTimetable
      ,createCourtDto.idTariff,createCourtDto.rating,createCourtDto.observations,createCourtDto.idStatus));
      if (court)
        return court;
      else
        throw new Error('No se pudo crear el court :(');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion del court '+ error
      }, HttpStatus.NOT_FOUND);
    }
  }

    public async getAll(): Promise<Court[]> {
      try {
        this.court= await this.courtRepository.find();
        if (this.court)
          return this.court
        else throw new Error('no se encuentran Canchas');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :)" + error
        }, HttpStatus.NOT_FOUND)
      }
  
    }

    public async findOne(idCourt: number): Promise<Court[]> {
      try {
        const criterio: FindOneOptions = { where:{ id: idCourt }};
        let court: Court = await this.courtRepository.findOne(criterio);
        this.court = [];
        if (Court){
          this.court.push(court)
        }
        else throw new Error('no se encuentran Courts');
        return this.court;
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :" + error
        }, HttpStatus.NOT_FOUND)
  
      }
    }

    public async updateCourt(CourtDTO : UpdateCourtDto) : Promise<Court> {
      try {
          let criterio : FindOneOptions = { where:{id:CourtDTO.id}};
          let Court : Court = await this.courtRepository.findOne(criterio);
          if (!Court)
             throw new Error('No se encuentra la Court');
          else
             Court.setName(CourtDTO.name);
             Court.setNumb(CourtDTO.numb);
             Court.setObservations(CourtDTO.observations);
             Court.setRating(CourtDTO.rating);
             //Court.reservations[](CourtDTO.reservations);//Aca me trabe,no se como continuar.Sigo con el metodo Delete.
          Court = await this.courtRepository.save(Court);
          return Court;
       } catch (error) {
             throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                   error : 'Error en la actualizacion de Court '+error}, HttpStatus.NOT_FOUND);
       }
       }
//Falta teminar el update/

public async remove(idCourt:number) : Promise<string> {
  try {
     let criterio : FindOneOptions = {where:{id:idCourt}};
     let court : Court = await this.courtRepository.findOne(criterio);
     if (!court)
        throw new Error('No se encuentra la Cancha');
     else
        await this.courtRepository.delete(court.getId());
     return ("El tipo de cancha fue cambiado correctamente .")
  } catch (error) {
        throw new HttpException( { status : HttpStatus.NOT_FOUND, 
              error : 'Error en la eliminacion de la cancha '+error}, HttpStatus.NOT_FOUND);
  }
}
}
