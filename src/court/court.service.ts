import {
  BadRequestException,
  GoneException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ILike, Repository } from 'typeorm';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';
import { TypeOfCourt } from 'src/type-of-court/entities/type-of-court.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { Tariff } from 'src/tariff/entities/tariff.entity';
import { StatusOfCourt } from 'src/status-of-court/entities/status-of-court.entity';
import { CreateTimetableDto } from 'src/timetable/dto/create-timetable.dto';
import { QueryCourtDto } from './dto/query-court.dto';

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
    CREATE: `Los datos para crear ${ERROR_ENTITY_LOWER} no son válidos`,
    UPDATE: `Los datos para modificar ${ERROR_ENTITY_LOWER} no son válidos`,
  },
};

@Injectable()
export class CourtService {
  private courts: Court[] = [];

  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
    @InjectRepository(TypeOfCourt)
    private readonly typeOfCourtRepository: Repository<TypeOfCourt>,
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
    @InjectRepository(Tariff)
    private readonly tariffRepository: Repository<Tariff>,
    @InjectRepository(StatusOfCourt)
    private readonly statusOfCourtRepository: Repository<StatusOfCourt>,
  ) {}

  // ESTO Funciona pero no corrobora las otras entidades--
  //  public async create(createCourtDto: CreateCourtDto): Promise<Court> {
  //   let court: Court = await this.courtRepository.save(new Court(
  //     createCourtDto.numb,createCourtDto.name,createCourtDto.idType,createCourtDto.idTimetable
  //   ,createCourtDto.idTariff,createCourtDto.rating,createCourtDto.observations,createCourtDto.idStatus,createCourtDto.active));
  //   if (court)
  //     return court;
  //   else
  //     throw new Error('No se pudo crear la cancha :(');
  // }
  public async create(createCourtDto: CreateCourtDto): Promise<Court> {
    try {
      // Verificar si el ID de TypeOfCourt existe
      let criterio: FindOneOptions = { where: { id: createCourtDto.idType } };
      const typeExists = await this.typeOfCourtRepository.findOne(criterio);

      // Verificar si el ID de Timetable existe
      let criterio2: FindOneOptions = {
        where: { id: createCourtDto.idTimetable },
      };
      const timetableExists = await this.timetableRepository.findOne(criterio2);
      if (!timetableExists) {
        throw new BadRequestException(
          `El idTimetable ${createCourtDto.idTimetable} no existe`,
        );
      }

      // Verificar si el ID de Tariff existe
      let criterio3: FindOneOptions = {
        where: { id: createCourtDto.idTariff },
      };
      const tariffExists = await this.tariffRepository.findOne(criterio3);
      if (!tariffExists) {
        throw new BadRequestException(
          `El idTariff ${createCourtDto.idTariff} no existe`,
        );
      }

      // Verificar si el ID de StatusOfCourt existe
      let criterio4: FindOneOptions = {
        where: { id: createCourtDto.idStatus },
      };
      const statusExists =
        await this.statusOfCourtRepository.findOne(criterio4);
      if (!statusExists) {
        throw new BadRequestException(
          `El idStatus ${createCourtDto.idStatus} no existe`,
        );
      }

      // Crear la nueva cancha
      const court = await this.courtRepository.save(
        new Court(
          createCourtDto.numb,
          createCourtDto.name,
          createCourtDto.idType,
          createCourtDto.idTimetable,
          createCourtDto.idTariff,
          createCourtDto.rating,
          createCourtDto.observations,
          createCourtDto.idStatus,
          createCourtDto.active,
        ),
      );

      if (!court) {
        throw new Error('No se pudo crear la cancha :(');
      }

      return court;
    } catch (error) {
      console.error(error); // Imprime el error completo en la consola
      throw new BadRequestException('Error al crear la cancha');
    }
  }

  public async getAll({
    idType = null,
    idTimetable = null,
    idTariff = null,
    idStatus = null,
    observations=null,
    rating = null,
    active = null,

    search = null,
    orderBy = 'name',
    sort = 'ASC',
    page = 1,
    perPage = 10,
  }: QueryCourtDto): Promise<Court[]> {

    const criterio: FindManyOptions = {
      relations: ['type', 'timetable', 'tariff', 'status'],
      where: {
        ...(idType ? { idType: idType } : {}),
        ...(idTimetable ? { idTimetable: idTimetable } : {}),
        ...(idStatus ? { idStatus: idStatus } : {}),
        ...(idTariff ? { idTariff: idTariff } : {}),
        ...(rating ? { rating: rating } : {}),
        ...(observations ? { observations: ILike(`%${observations}%`) } : {}),
        ...(search
          ? {
               ...([
                { numb: ILike(`%${search}%`) },
                { name: ILike(`%${search}%`) },
                { observations: ILike(`%${search}%`) },
              ])
            }
          : {}),
      },
      ...(orderBy ? { order: { [orderBy]: sort } } : {}),
      // skip: page*perPage,
      // skip: (current - 1) * pageSize,
      // take: perPage,
      // select: {
      //   type: { name: true },
      //   timetable: { name: true },
      //   tariff: { name: true },
      //   status: { name: true },
      //   idStatus: false,
      //   idTimetable: false,
      //   idTariff: false,
      //   idStatus: false,
      // },
    };
    try {      
      this.courts = await this.courtRepository.find(criterio);
      if (this.courts) return this.courts;
      else throw new Error('no se encuentran Canchas');
    } catch (error) {
      throw new NotFoundException(
        'Error en la busqueda: ',
        ERROR_MSG.NOT_FOUND_ANY,
      );
      // throw new HttpException(
      //   {
      //     status: HttpStatus.NOT_FOUND,
      //     error: 'Error en la busqueda :)' + error,
      //   },
      //   HttpStatus.NOT_FOUND,
      // );
    }
  }

  public async findOne(idCourt: number): Promise<Court[]> {
    try {
      const court = await this.getCourtById(idCourt);

      if (!court) throw new Error('No se encuentran Canchas');
      //     this.courts = [];
      //       this.courts.push(court)
      //     return this.courts;

      return [court];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda: ' + error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async updateCourt(
    idCourt: number,
    datos: UpdateCourtDto,
  ): Promise<ResponseObject> {
    try {
      if (!idCourt) {
        throw new BadRequestException(ERROR_MSG.INVALID_ID);
      }

      if (!datos) {
        throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);
      }

      // Verificar si la cancha existe
      const court = await this.getCourtById(idCourt);
      if (!court) {
        throw new GoneException(ERROR_MSG.NOT_FOUND);
      }

      // Verificar si el ID de TypeOfCourt existe
      let criterioType: FindOneOptions = { where: { id: datos.idType } };
      const typeExists = await this.typeOfCourtRepository.findOne(criterioType);
      if (!typeExists) {
        throw new BadRequestException(`El idType ${datos.idType} no existe`);
      }

      // Verificar si el ID de Timetable existe
      let criterioTimetable: FindOneOptions = {
        where: { id: datos.idTimetable },
      };
      const timetableExists =
        await this.timetableRepository.findOne(criterioTimetable);
      if (!timetableExists) {
        throw new BadRequestException(
          `El idTimetable ${datos.idTimetable} no existe`,
        );
      }

      // Verificar si el ID de Tariff existe
      let criterioTariff: FindOneOptions = { where: { id: datos.idTariff } };
      const tariffExists = await this.tariffRepository.findOne(criterioTariff);
      if (!tariffExists) {
        throw new BadRequestException(
          `El idTariff ${datos.idTariff} no existe`,
        );
      }

      // Verificar si el ID de StatusOfCourt existe
      let criterioStatus: FindOneOptions = { where: { id: datos.idStatus } };
      const statusExists =
        await this.statusOfCourtRepository.findOne(criterioStatus);
      if (!statusExists) {
        throw new BadRequestException(
          `El idStatus ${datos.idStatus} no existe`,
        );
      }

      // Actualizar la cancha con los nuevos datos
      court.setName(datos.name);
      court.setNumb(datos.numb);
      court.setObservations(datos.observations);
      court.setRating(datos.rating);
      court.setActive(datos.active);
      court.setIdType(datos.idType);
      court.setIdTimetable(datos.idTimetable);
      court.setIdTariff(datos.idTariff);
      court.setIdStatus(datos.idStatus);

      const courtUpdated: Court = await this.courtRepository.save(court);

      return ServiceResponseOk(
        `${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
        courtUpdated,
      );
    } catch (error) {
      console.error(error); // Imprime el error completo en la consola
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al actualizar la cancha: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(idCourt: number): Promise<string> {
    try {
      let criterio: FindOneOptions = { where: { id: idCourt } };
      let court: Court = await this.courtRepository.findOne(criterio);
      if (!court) throw new Error('No se encuentra la Cancha');
      else await this.courtRepository.delete(court.getId());
      return 'La cancha fue eliminada correctamente .';
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

  //---------------------------------------------------------------------------
  private async getCourtById(idCourt: number): Promise<Court> {
    const criterio: FindOneOptions = { where: { id: idCourt } };
    return await this.courtRepository.findOne(criterio);
  }
}
