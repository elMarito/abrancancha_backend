import { BadRequestException, ConflictException } from '@nestjs/common';
import { GoneException, InternalServerErrorException } from '@nestjs/common';
import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Timetable } from './entities/timetable.entity';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

const ERROR_ENTITY = 'calendario';
const ERROR_ENTITY_LOWER = `la ${ERROR_ENTITY}`;
const ERROR_ENTITY_UCASE = `La ${ERROR_ENTITY}`;
const ERROR_ENTITIES = 'calendarios';
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
export class TimetableService {
  private timetables: Timetable[] = [];

  constructor(
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
    // @InjectRepository(Schedules) //**quizas esto no va */
    // private readonly scheduleRepository: Repository<Schedules>,
    private scheduleService: ScheduleService,
  ) {}
  //---------------------------------------------------------------------------
  public async create(datos: CreateTimetableDto): Promise<Timetable> {
    if (await this.existTimetableName(datos.name))
      throw new ConflictException(
        'Error: Datos repetidos\n',
        ERROR_MSG.REPEATED +
          '\nYa existe otro usuario registrado con ese nombre: ' +
          datos.name,
      );

    let timetable: Timetable = await this.timetableRepository.save(
      // new Timetable(datos.name, datos.schedules),
      new Timetable(datos.name),
    );
    //*************
    // let timetable : Timetable;
    // if (datos)
    // if (datos.name) {
    // let timetable: Timetable = new Timetable(datos.name);
    // let timetable: Timetable = new Timetable(datos.name, datos.schedules);

    if (datos.schedules.length) {
      let newSchedule; //: CreateScheduleDto;
      datos.schedules.forEach(async (schedule) => {
        // newSchedule = { ...schedule, timetable: timetable };
        newSchedule = {
          dayOfWeek: schedule.dayOfWeek,
          timeFrom: new Date(schedule.timeFrom),
          timeTo: new Date(schedule.timeTo),
          timetable: timetable
        };
        // newSchedule = {
        //   dayOfWeek: schedule.getDayOfWeek(),
        //   timeFrom: schedule.getTimeFrom(),
        //   timeTo: schedule.getTimeTo(),
        //   timetable: timetable,
        // };
        // let user: Schedule =
        await this.scheduleService.create(newSchedule);
      });
    }

    // timetable.schedules = [];
    // for (let i = 0; i < datos.schedules.length; i++) {
    //   const schedule: CreateScheduleDto = datos.schedules[i];
    // }
    // let schedule: Schedule =  datos.schedules[i];
    // console.log(schedule);
    // timetable.schedules.push(schedule);

    // await this.timetableRepository.save(timetable);

    //**************

    if (timetable) return timetable;
    throw new Error(
      'Error inesperado' + `\nError creando ${ERROR_ENTITY_LOWER}:`,
    );
  }
  //---------------------------------------------------------------------------
  public async findAll(): Promise<Timetable[]> {
    this.timetables = await this.timetableRepository.find();
    if (this.timetables) return this.timetables;
    throw new NotFoundException(
      'Error en la busqueda: ',
      ERROR_MSG.NOT_FOUND_ANY,
    );
  }
  //---------------------------------------------------------------------------
  public async findAllwithSchedules(): Promise<Timetable[]> {
    const criterio: FindManyOptions = { relations: ['schedules'] };
    this.timetables = await this.timetableRepository.find(criterio);
    if (this.timetables) return this.timetables;
    throw new NotFoundException(
      'Error en la busqueda: ',
      ERROR_MSG.NOT_FOUND_ANY,
    );
  }
  //---------------------------------------------------------------------------
  public async findOne(idTimetable: number): Promise<Timetable[]> {
    const criterio: FindOneOptions = { where: { id: idTimetable } };
    let timetable: Timetable = await this.timetableRepository.findOne(criterio);

    this.timetables = [];
    if (timetable) this.timetables.push(timetable);
    else throw new Error(ERROR_MSG.NOT_FOUND);
    return this.timetables;
  }
  //---------------------------------------------------------------------------
  public async update(
    idTimetable: number,
    datos: UpdateTimetableDto,
  ): Promise<ResponseObject> {
    if (!idTimetable) throw new BadRequestException(ERROR_MSG.INVALID_ID);
    if (!datos) throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);

    let timetable: Timetable = await this.getTimetableById(idTimetable);

    if (timetable == null) throw new GoneException(ERROR_MSG.NOT_FOUND);

    timetable.setName(datos.name);
    // timetable.setSchedules(datos.schedules);
    const timetableUpdated: Timetable =
      await this.timetableRepository.save(timetable);
    //else
    //  throw new Error(ERROR_MSG.INVALID_DATA_4.UPDATE);

    return ServiceResponseOk(
      `${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
      timetableUpdated,
    );
  }
  //---------------------------------------------------------------------------
  public async remove(id: number): Promise<ResponseObject> {
    if (!id) throw new BadRequestException(ERROR_MSG.NO_DATA_4.DELETE);

    const timetableExists = await this.existTimetableId(id);
    if (!timetableExists) throw new GoneException(ERROR_MSG.NOT_FOUND);

    await this.timetableRepository.delete(id);

    return ServiceResponseOk(
      `${ERROR_ENTITY_UCASE} se ha borrado exitosamente.`,
    );
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private async getTimetableById(idTimetable: number): Promise<Timetable> {
    const criterio: FindOneOptions = { where: { id: idTimetable } };
    return await this.timetableRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async getTimetablesByName(name: string): Promise<Timetable[]> {
    // const criterio: FindManyOptions = { relations: ['StatusOfUser','Timetable','Administrator'] };
    // const criterio: FindManyOptions = { relations: ['Court'], where: { court: court } };
    const criterio: FindManyOptions = { where: { name: name } };
    return await this.timetableRepository.find(criterio);
    // return await this.timetableRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async existTimetableId(id: number): Promise<boolean> {
    // const criterio: FindOneOptions = { where: { id: idTimetable } };
    const timetable: Timetable = await this.getTimetableById(id);
    return timetable != null;
  }
  //---------------------------------------------------------------------------
  private async existTimetableName(name: string): Promise<boolean> {
    // const criterio: FindOneOptions = { where: { id: idTimetable } };
    const timetable: Timetable[] = await this.getTimetablesByName(name);
    return timetable[0] != null;
  }
      //---------------------------------------------------------------------------
      // private async getScheduleByName(name: string): Promise<Timetable> {
      //   // const criterio: FindManyOptions = { relations: ['StatusOfUser','Timetable','Administrator'] };
      //   // const criterio: FindManyOptions = { relations: ['Court'], where: { court: court } };
      //   const criterio: FindOneOptions = { where: { name: name } };
      //   return await this.timetabscheleRepository.findOne(criterio);
      //   // return await this.timetableService.getTimetablesByName(name)
      //   // const timetable:Timetable[]= await this.timetableService.getTimetablesByName(datos.timetable.name)

      //   // return await this.timetableRepository.findOne(criterio);
      // }
}
