import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

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

  findAll() {
    return `This action returns all timetable`;
  }

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

  update(id: number, updateTimetableDto: UpdateTimetableDto) {
    return `This action updates a #${id} timetable`;
  }

  remove(id: number) {
    return `This action removes a #${id} timetable`;
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
