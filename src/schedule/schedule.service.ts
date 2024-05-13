import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { FindOneOptions, Repository } from 'typeorm';
// import { Timetable } from 'src/timetable/entities/timetable.entity';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';

const ERROR_ENTITY = 'agenda';
const ERROR_ENTITY_LOWER = `la ${ERROR_ENTITY}`;
const ERROR_ENTITY_UCASE = `la ${ERROR_ENTITY}`;
const ERROR_ENTITIES = 'agendas';
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
export class ScheduleService {
  private schedules: Schedule[] = [];

  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  //---------------------------------------------------------------------------
  public async create(datos: CreateScheduleDto): Promise<Schedule> {
    let schedule: Schedule = await this.scheduleRepository.save(
      new Schedule(
        datos.dayOfWeek,
        datos.timeFrom,
        datos.timeTo,
        datos.timetable
        // datos.idTimetable,
      ),
    );

    if (schedule) return schedule;
    throw new Error('Error inesperado:\n'+ERROR_MSG.CANT_CREATE );
  }
  //---------------------------------------------------------------------------
  public async findAll(): Promise<Schedule[]> {
    this.schedules = await this.scheduleRepository.find();
    if (this.schedules) return this.schedules;
    throw new NotFoundException(
      'Error en la busqueda: ',
      ERROR_MSG.NOT_FOUND_ANY,
    );
  }
  //---------------------------------------------------------------------------
  public async findOne(idSchedule: number): Promise<Schedule[]> {
    const criterio: FindOneOptions = { where: { id: idSchedule } };
    let schedule: Schedule = await this.scheduleRepository.findOne(criterio);

    this.schedules = [];
    if (schedule) this.schedules.push(schedule);
    else throw new Error('Error en la busqueda: '+ ERROR_MSG.NOT_FOUND);
    return this.schedules;
  }
  //---------------------------------------------------------------------------
  public async update(
    idSchedule: number,
    datos: UpdateScheduleDto,
  ): Promise<ResponseObject> {
    if (!idSchedule) throw new BadRequestException(ERROR_MSG.INVALID_ID);
    if (!datos) throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);

    let schedule: Schedule = await this.getScheduleById(idSchedule);

    if (schedule == null) throw new GoneException(ERROR_MSG.NOT_FOUND);

    //si modifico algo, chequear que no repita la otra agenda
    if (
      (datos.dayOfWeek && schedule.getDayOfWeek() !== datos.dayOfWeek) ||
      (datos.timeFrom && schedule.getTimeFrom() !== datos.timeFrom) ||
      (datos.timeTo && schedule.getTimeTo() !== datos.timeTo) ||
      (datos.timetable && schedule.getTimetable() !== datos.timetable)
    ) {
      const otherSchedule: Schedule =
        await this.getScheduleByDow_Tf_Tt_Table(datos);
      if (otherSchedule.getId() != idSchedule)
        throw new ConflictException("Datos repetidos",
          'Los datos cargados pertenece a otra agenda.'
        );
    }
    schedule.setDayOfWeek(datos.dayOfWeek);
    schedule.setTimeFrom(datos.timeFrom);
    schedule.setTimeTo(datos.timeTo);
    schedule.setTimetable(datos.timetable);
    const scheduleUpdated: Schedule =
      await this.scheduleRepository.save(schedule);
    //else
    //  throw new Error(ERROR_MSG.INVALID_DATA_4.UPDATE);
    return ServiceResponseOk(
      `${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
      scheduleUpdated,
    );
  }
  //---------------------------------------------------------------------------
  public async remove(id: number): Promise<ResponseObject> {
    if (!id) throw new BadRequestException(ERROR_MSG.NO_DATA_4.DELETE);

    const scheduleExists = await this.existScheduleId(id);
    if (!scheduleExists) throw new GoneException(ERROR_MSG.NOT_FOUND);

    await this.scheduleRepository.delete(id);

    return ServiceResponseOk(`${ERROR_ENTITY} borrada exitosamente.`);
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private async getScheduleById(idSchedule: number): Promise<Schedule> {
    const criterio: FindOneOptions = { where: { id: idSchedule } };
    return await this.scheduleRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async getScheduleByDow_Tf_Tt_Table({
    dayOfWeek,
    timeFrom,
    timeTo,
    timetable,
  }: UpdateScheduleDto): Promise<Schedule> {
    const criterio: FindOneOptions = {
      where: {
        dayOfWeek: dayOfWeek,
        timeFrom: timeFrom,
        timeTo: timeTo,
        timetable: timetable,
      },
    };
    return await this.scheduleRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async existScheduleId(id: number): Promise<boolean> {
    const schedule: Schedule = await this.getScheduleById(id);
    return schedule != null;
  }
}