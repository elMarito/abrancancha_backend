import { Court } from 'src/court/entities/court.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('statusOfCourt')
export class StatusOfCourt {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @OneToMany(() => Court, (court) => court.status)
  public courts: Court[];
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
