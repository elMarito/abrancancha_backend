import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

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
  private courts: Court[] = [];

  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
  ) {}

  public async create(createCourtDto: CreateCourtDto): Promise<Court> {
    try {
      let court: Court = await this.courtRepository.save(
        new Court(
          createCourtDto.numb,
          createCourtDto.name,
          createCourtDto.idType,
          createCourtDto.idTimetable,
          createCourtDto.idTariff,
          createCourtDto.rating,
          createCourtDto.observations,
          createCourtDto.idStatus,
        ),
      );
      if (court) return court;
      else throw new Error('No se pudo crear el court :(');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la creacion del court ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getAll(): Promise<Court[]> {
    try {
      this.courts = await this.courtRepository.find();
      if (this.courts) return this.courts;
      else throw new Error('no se encuentran Canchas');
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

  public async findOne(idCourt: number): Promise<Court[]> {
    try {
      const criterio: FindOneOptions = { where: { id: idCourt } };
      let court: Court = await this.courtRepository.findOne(criterio);
      this.courts = [];
      if (Court) {
        this.courts.push(court);
      } else throw new Error('no se encuentran Courts');
      return this.courts;
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

  public async updateCourt(
    idCourt: number,
    CourtDTO: UpdateCourtDto,
  ): Promise<Court> {
    try {
      let criterio: FindOneOptions = { where: { id: idCourt } };
      let Court: Court = await this.courtRepository.findOne(criterio);
      if (!Court) throw new Error('No se encuentra la Court');
      else Court.setName(CourtDTO.name);
      Court.setNumb(CourtDTO.numb);
      Court.setObservations(CourtDTO.observations);
      Court.setRating(CourtDTO.rating);
      //Court.reservations[](CourtDTO.reservations);//Aca me trabe,no se como continuar.Sigo con el metodo Delete.
      Court = await this.courtRepository.save(Court);
      return Court;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la actualizacion de Court ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //Falta teminar el update/

  public async remove(idCourt: number): Promise<string> {
    try {
      let criterio: FindOneOptions = { where: { id: idCourt } };
      let court: Court = await this.courtRepository.findOne(criterio);
      if (!court) throw new Error('No se encuentra la Cancha');
      else await this.courtRepository.delete(court.getId());
      return 'El tipo de cancha fue cambiado correctamente .';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la eliminacion de la cancha ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
