// #Region IMPORT

import { Court } from 'src/court/entities/court.entity';
import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  private id: number;

  //@Column()
  //private idUser: number;

  // "id": 1,
  // "idUser": 1,
  // "idCourt": 1,
  // "fecha": "2023-10-21T10:00:00Z",
  // "estado": "confirmada"

  //**Dada la tabla  "reservations" con los siguientes atributos:
  // "id": 1,
  // "idUsuario": 1,
  // "idCancha": 1,
  // "fecha": "2023-10-21T10:00:00Z",
  // "estado": "confirmada"
  // puedes generar el codigo del archivo entity correspondiente para nest?

  // @Column()
  // private idCourt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private timedate: Date;

  @Column()
  private price: number;

  // @Column()
  // private status: string;

  // @Column()
  // private idStatus: number;
  
  @ManyToOne(() => User, user => user.reservations)
  @JoinColumn()
  public user: User;

  @ManyToOne(() => Court, court => court.reservations)
  @JoinColumn()
  public court: Court;

  @ManyToOne(() => StatusOfReservation, statusOfReservation => statusOfReservation.reservations)
  @JoinColumn()
  public status: StatusOfReservation;
  //---------------------------------------------------------------------------
  constructor(
    idUser: number,
    idCourt: number,
    timedate: Date,
    price: number,
    // status: string,
  ) {
    // this.idUser = idUser;
    // this.idCourt = idCourt;
    this.timedate = timedate;
    this.price = price;
    // this.status = status;
  }
  //---------------------------------------------------------------------------
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  // getIdUser(): number {
  //   return this.idUser;
  // }

  // setIdUser(idUser: number): void {
  //   this.idUser = idUser;
  // }

  // getIdCourt(): number {
  //   return this.idCourt;
  // }

  // setIdCourt(idCourt: number): void {
  //   this.idCourt = idCourt;
  // }

  getTimedate(): Date {
    return this.timedate;
  }

  setTimedate(fecha: Date): void {
    this.timedate = fecha;
  }

  // getStatus(): string {
  //   return this.status;
  // }

  // setStatus(status: string): void {
  //   this.status = status;
  // }
}
