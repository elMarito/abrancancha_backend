import { Court } from 'src/court/entities/court.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';

@Entity('timetables')
export class Timetable {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @OneToMany(() => Court, (court) => court.timetable)
  public courts: Court[];

  @OneToMany(() => Schedule, (schedule) => schedule.timetable)
  public schedules: Schedule[];
  //---------------------------------------------------------------------------
  constructor(name: string, schedules?: Schedule[]) {
    this.name = name;
    this.schedules = schedules;// || [];
  }
  //---------------------------------------------------------------------------
  // Getters and Setters
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }

  getSchedules(): Schedule[] {
    return this.schedules;
  }
  setSchedules(schedules: Schedule[]): void {
    this.schedules = schedules;
  }

  getCourts(): Court[] {
    return this.courts;
  }
}