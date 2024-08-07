

import { Court } from 'src/court/entities/court.entity';
import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  private id: number;

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

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', nullable: false  })
  // @Column({ type: 'date' , nullable: false })
  private timedate: Date;

  @Column()
  private price: number;

  @ManyToOne(() => User, user => user.reservations)
  @JoinColumn( { name: 'idUser', referencedColumnName: 'id' })
  public user: User;

  @ManyToOne(() => Court, court => court.reservations)
  @JoinColumn( { name: 'idCourt', referencedColumnName: 'id' })
  public court: Court;

  @ManyToOne(() => StatusOfReservation, statusOfReservation => statusOfReservation.reservations)
  @JoinColumn( { name: 'idStatus', referencedColumnName: 'id' })
  public status: StatusOfReservation;

  @Column({ nullable: false })
  private idUser: number;

  @Column({ nullable: false })
  private idCourt: number;
  // @Column()
  // private status: string;

  @Column({ nullable: false })
  private idStatus: number;
  //---------------------------------------------------------------------------
  constructor(
    // user: User,
    // court: Court,
    timedate: Date,
    idUser: number,
    idCourt: number,
    price: number,
    idStatus?: number,
    // status: string,
  ) {
    this.timedate = timedate;
    this.price = price; //deberia venir averiguarlo de court.tariff.price
    // this.price = court.tariff.getPrice();
    this.idUser = idUser;
    this.idCourt = idCourt;
    this.idStatus = idStatus || 1;
    // this.user=user;
    // this.court =court;
    // this.status = status;
  }
  //---------------------------------------------------------------------------
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  public getUser(): User { return this.user; }
  public setUser( user:User): void { this.user = user; }
  public getCourt(): Court { return this.court; }
  public setCourt( court:Court): void { this.court = court; }
  public getStatus(): StatusOfReservation { return this.status; }
  public setStatus( status:StatusOfReservation): void { this.status = status; }
  getIdUser(): number {
    return this.idUser;
  }

  // setIdUser(idUser: number): void {
  //   this.idUser = idUser;
  // }

  getIdCourt(): number {
    return this.idCourt;
  }

  // setIdCourt(idCourt: number): void {
  //   this.idCourt = idCourt;
  // }

  
  getTimedate(): string {
    return this.timedate;
  }

  setTimedate(timedate: string): void {
    this.timedate = timedate;
  }

  getIdStatus(): number {
    return this.idStatus;
  }

  setIdStatus(idStatus: number): void {
    this.idStatus = idStatus;
  }
}
