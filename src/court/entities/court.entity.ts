import { Reservation } from 'src/reservation/entities/reservation.entity';
import { StatusOfCourt } from 'src/status-of-court/entities/status-of-court.entity';
import { Tariff } from 'src/tariff/entities/tariff.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { TypeOfCourt } from 'src/type-of-court/entities/type-of-court.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private numb: string;

  @Column()
  private name: string;

  @Column()
  private idType: number;

  @Column()
  private idTimetable: number;

  @Column()
  private idTariff: number;

  @Column()
  private rating: number;

  @Column()
  private observations: string;

  @Column()
  private idStatus: number;

  @Column()
  private active: boolean;

  @OneToMany(() => Reservation, reservation => reservation.court)
  public reservations: Reservation[];

  @ManyToOne(() => TypeOfCourt, typeOfCourt => typeOfCourt.courts)
  @JoinColumn( { name: 'idType', referencedColumnName: 'id' })
  public type: TypeOfCourt;

  @ManyToOne(() => Timetable, timetable => timetable.courts)
  @JoinColumn( { name: 'idTimetable', referencedColumnName: 'id' })
  public timetable: Timetable;

  @ManyToOne(() => Tariff, tariff => tariff.courts)
  @JoinColumn( { name: 'idTariff', referencedColumnName: 'id' })
  public tariff: Tariff;

  @ManyToOne(() => StatusOfCourt, typeOfCourt => typeOfCourt.courts)
  @JoinColumn( { name: 'idStatus', referencedColumnName: 'id' })
  public status: StatusOfCourt;
  //---------------------------------------------------------------------------
  // "idClub": 1,
  // "numero": "C2",
  // "nombre": "Cancha 2",
  // "idTipo": 1,
  // "tarifa": 50,
  // "rating": 4,
  // "observaciones": "Cancha de césped sintético",
  // "active": true

  constructor(
    numb: string,
    name: string,
    idType: number,
    idTimetable: number,
    idTariff: number,
    rating: number,
    observations: string,
    idStatus: number,
    active: boolean
  ) {
    this.numb = numb;
    this.name = name;
    this.idType = idType;
    this.idTimetable = idTimetable;
    this.idTariff = idTariff;
    this.rating = rating;
    this.observations = observations;
    this.idStatus = idStatus;
    this.active = active;
  }
  //---------------------------------------------------------------------------
  // Getters and Setters

  // Getters
  getId(): number {
    return this.id;
  }
  getNumb(): string {
    return this.numb;
  }
  getName(): string {
    return this.name;
  }
  getIdType(): number {
    return this.idType;
  }
  getIdTimetable(): number {
    return this.idTimetable;
  }
  getIdTariff(): number {
    return this.idTariff;
  }

  getRating(): number {
    return this.rating;
  }
  getObservations(): string {
    return this.observations;
  }
   getIdStatus(): number {
     return this.idStatus;
   }
     getActive(): boolean { 
   return this.active; 
    }

     
  // Setters
  setNumb(numb: string): void {
    this.numb = numb;
  }
  setName(name: string): void {
    this.name = name;
  }
  setIdType(idType: number): void {
    this.idType = idType;
  }
  setIdTimetable(idTimetable: number): void {
    this.idTimetable = idTimetable;
  }
  setIdTariff(idTariff: number): void {
    this.idTariff = idTariff;
  }
  setRating(rating: number): void {
    this.rating = rating;
  }
  setObservations(observations: string): void {
    this.observations = observations;
  }
  setIdStatus(idStatus: number): void {
    this.idStatus = idStatus;
  }
  setActive(active: boolean): void {
   this.active = active;  
  }
}
