import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("exceptionsTimedate")
export class ExceptionTimedate {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private dayOfWeek: number;

  @Column({ type: 'date' })
  private dateFrom: Date;

  @Column({ type: 'date' })
  private dateTo: Date;
//---------------------------------------------------------------------------
  constructor(dayOfWeek: number, dateFrom: Date, dateTo: Date) {
    this.dayOfWeek = dayOfWeek;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
//---------------------------------------------------------------------------
  // Getters and Setters
  getId(): number {
    return this.id;
  }

  getDayOfWeek(): number {
    return this.dayOfWeek;
  }

  setDayOfWeek(dayOfWeek: number): void {
    this.dayOfWeek = dayOfWeek;
  }

  getDateFrom(): Date {
    return this.dateFrom;
  }

  setDateFrom(dateFrom: Date): void {
    this.dateFrom = dateFrom;
  }

  getDateTo(): Date {
    return this.dateTo;
  }

  setDateTo(dateTo: Date): void {
    this.dateTo = dateTo;
  }
}
