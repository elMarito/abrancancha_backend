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
  private rating: string;

  @Column()
  private observations: string;


  @Column()
  private active: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.court)
  public reservations: Reservation[];

  @ManyToOne(() => TypeOfCourt, (typeOfCourt) => typeOfCourt.courts)
  @JoinColumn()
  public type: TypeOfCourt;

  @ManyToOne(() => Timetable, (timetable) => timetable.courts)
  @JoinColumn()
  public timetable: Timetable;

  @ManyToOne(() => Tariff, (tariff) => tariff.courts)
  @JoinColumn()
  public tariff: Tariff;

  @ManyToOne(() => StatusOfCourt, (typeOfCourt) => typeOfCourt.courts)
  @JoinColumn()
  public status: StatusOfCourt;
  //---------------------------------------------------------------------------
  // "idClub": 1,
  // "numero": "C2",
  // "nombre": "Cancha 2",
  // "idTipo": 1,
  // "tarifa": 50,
  // "rating": 4,
  // "observaciones": "Cancha de césped sintético",
  // "activa": true

  constructor(
    numb: string,
    name: string,
    idType: number,
    idTimetable: number,
    idTariff: number,
    rating: string,
    observations: string,
    idStatus: number,
    // active: boolean
  ) {
    this.numb = numb;
    this.name = name;
    
    
    this.rating = rating;
    this.observations = observations;
    
    // this.active = active;
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
  
  getRating(): string {
    return this.rating;
  }
  getObservations(): string {
    return this.observations;
  }
  
  //   getActive(): boolean {    return this.active;  }
  // Setters
  setNumb(numb: string): void {
    this.numb = numb;
  }
  setName(name: string): void {
    this.name = name;
  }
  
  
  
  setRating(rating: string): void {
    this.rating = rating;
  }
  setObservations(observations: string): void {
    this.observations = observations;
  }
  
  //   setActive(active: boolean): void {    this.active = active;  }
}
