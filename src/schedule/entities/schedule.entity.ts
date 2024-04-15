import { Timetable } from 'src/timetable/entities/timetable.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private idTimetable: number;

  @Column()
  private dayOfWeek: number;

  @Column({ type: 'time' })
  private timeFrom: Date;

  @Column({ type: 'time' })
  private timeTo: Date;

  @ManyToOne(() => Timetable, (timetable) => timetable.schedules)
  @JoinColumn()
  public timetable: Timetable;
  //---------------------------------------------------------------------------
  constructor(
    idTimetable: number,
    dayOfWeek: number,
    timeFrom: Date,
    timeTo: Date,
  ) {
    this.idTimetable = idTimetable;
    this.dayOfWeek = dayOfWeek;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
  }
  //---------------------------------------------------------------------------
  // Getters and Setters
  getId(): number {
    return this.id;
  }

  getIdTimetable(): number {
    return this.idTimetable;
  }

  setIdTimetable(idTimetable: number): void {
    this.idTimetable = idTimetable;
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
