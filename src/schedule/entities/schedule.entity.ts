import { Timetable } from 'src/timetable/entities/timetable.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private dayOfWeek: number;

  @Column({ type: 'time' })
  private timeFrom: Date;

  @Column({ type: 'time' })
  private timeTo: Date;

  @ManyToOne(() => Timetable, (timetable) => timetable.schedules)
  @JoinColumn({ name: 'idTimetable', referencedColumnName: 'id' })
  public timetable: Timetable;

  // @Column()
  // private idTimetable: number;
  //---------------------------------------------------------------------------
  constructor(
    dayOfWeek: number,
    timeFrom: Date,
    timeTo: Date,
    timetable: Timetable,
    // idTimetable: number,
  ) {
    // this.idTimetable = idTimetable;
    this.dayOfWeek = dayOfWeek;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
    this.timetable = timetable;
  }
  //---------------------------------------------------------------------------
  // Getters and Setters
  getId(): number {
    return this.id;
  }

  getTimetable(): Timetable {
    return this.timetable;
  }

  setTimetable(timetable: Timetable): void {
    this.timetable = timetable;
  }

  getDayOfWeek(): number {
    return this.dayOfWeek;
  }

  setDayOfWeek(dayOfWeek: number): void {
    this.dayOfWeek = dayOfWeek;
  }

  getTimeFrom(): Date {
    return this.timeFrom;
  }

  setTimeFrom(timeFrom: Date): void {
    this.timeFrom = timeFrom;
  }

  getTimeTo(): Date {
    return this.timeTo;
  }

  setTimeTo(timeTo: Date): void {
    this.timeTo = timeTo;
  }
}
