import { BadRequestException, GoneException, HttpException, HttpStatus, Inject, Injectable, Type } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';
import { TypeOfCourt } from 'src/type-of-court/entities/type-of-court.entity';

const ERROR_ENTITY = 'cancha';
const ERROR_ENTITY_LOWER = `la ${ERROR_ENTITY}`;
const ERROR_ENTITY_UCASE = `La ${ERROR_ENTITY}`;
const ERROR_ENTITIES = 'reservas';
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
export class CourtService {

  private courts :Court []=[];

  constructor(@InjectRepository(Court)
  private readonly courtRepository:Repository<Court>,
  private readonly typeOfCourtRepository:Repository<TypeOfCourt>,


){}

  public async create(createCourtDto: CreateCourtDto): Promise<Court> {
    {
//try {ACA ES NUEVO
      // Verificar si el ID de TypeOfCourt existe
      const typeExists = await this.typeOfCourtRepository.findOne(createCourtDto.idType);
      if (!typeExists) {
        throw new BadRequestException(`El idType ${createCourtDto.idType} no existe`);
      }

      // Verificar si el ID de Timetable existe
      const timetableExists = await this.timetableRepository.findOne(createCourtDto.idTimetable);
      if (!timetableExists) {
        throw new BadRequestException(`El idTimetable ${createCourtDto.idTimetable} no existe`);
      }

      // Verificar si el ID de Tariff existe
      const tariffExists = await this.tariffRepository.findOne(createCourtDto.idTariff);
      if (!tariffExists) {
        throw new BadRequestException(`El idTariff ${createCourtDto.idTariff} no existe`);
      }

      // Verificar si el ID de StatusOfCourt existe
      const statusExists = await this.statusOfCourtRepository.findOne(createCourtDto.idStatus);
      if (!statusExists) {
        throw new BadRequestException(`El idStatus ${createCourtDto.idStatus} no existe`);
      }

      let court: Court = await this.courtRepository.save(new Court(
        createCourtDto.numb,createCourtDto.name,createCourtDto.idType,createCourtDto.idTimetable
      ,createCourtDto.idTariff,createCourtDto.rating,createCourtDto.observations,createCourtDto.idStatus,createCourtDto.active));
      if (court)
        return court;
      else
        throw new Error('No se pudo crear la cancha :(');

    }  
  }

    public async getAll(): Promise<Court[]> {
      try {
        this.courts= await this.courtRepository.find();
        if (this.courts)
          return this.courts
        else throw new Error('no se encuentran Canchas');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :)" + error
        }, HttpStatus.NOT_FOUND)
      }
  
    }

    public async findOne(idCourt: number): Promise<Court[]> {
      try {
        let criterio: FindOneOptions = { where:{ id: idCourt }};
        let court: Court = await this.courtRepository.findOne(criterio);
        this.courts = [];
        if (Court){
          this.courts.push(court)
        }
        else throw new Error('no se encuentran Courts');
        return this.courts;
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :" + error
        }, HttpStatus.NOT_FOUND)
  
      }
    }


      public async updateCourt(
        idCourt:number,
        datos: UpdateCourtDto,
      ): Promise<ResponseObject> {
        if (!idCourt) throw new BadRequestException(ERROR_MSG.INVALID_ID);
        if (!datos) throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);
          
          let court: Court =
            await this.getCourtById(idCourt);
            if (court == null) throw new GoneException(ERROR_MSG.NOT_FOUND);
            
           court.setName(datos.name);
                 court.setNumb(datos.numb);
                court.setObservations(datos.observations);
                  court.setRating(datos.rating); 
                  court.setActive(datos.active);
                  court.setIdType(datos.idType);
                  court.setIdTimetable(datos.idTimetable);
                  court.setIdTariff(datos.idTariff);
                  court.setIdStatus(datos.idStatus);
          const courtUpdated:Court =
            await this.courtRepository.save(court);
          return ServiceResponseOk(`${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
          courtUpdated,
        );
        }
      


public async remove(idCourt:number) : Promise<string> {
  try {
     let criterio : FindOneOptions = {where:{id:idCourt}};
     let court : Court = await this.courtRepository.findOne(criterio);
     if (!court)
        throw new Error('No se encuentra la Cancha');
     else
        await this.courtRepository.delete(court.getId());
     return ("La cancha fue eliminada correctamente .")
  } catch (error) {
        throw new HttpException( { status : HttpStatus.NOT_FOUND, 
              error : 'Error en la eliminacion de la cancha '+error}, HttpStatus.NOT_FOUND);
  }
}

//---------------------------------------------------------------------------
private async getCourtById(
  idCourt: number,
): Promise<Court> {
  const criterio: FindOneOptions = { where: { id: idCourt } };
  return await this.courtRepository.findOne(criterio);
}
}

