import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('statusOfReservation')
export class StatusOfReservation {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @OneToMany(() => Reservation, reservation => reservation.status)
  public reservations: Reservation[];
  //---------------------------------------------------------------------------
  constructor(name: string) {
    this.name = name;
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
}
