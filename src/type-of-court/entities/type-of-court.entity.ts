import { Court } from 'src/court/entities/court.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('typesOfCourt')
export class TypeOfCourt {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @OneToMany(() => Court, court => court.type)
  public courts: Court[];
  //---------------------------------------------------------------------------
  constructor(name:string) {
    this.name = name;
  }
  //---------------------------------------------------------------------------
  // Getters and Setters
  public getIdTypeOfCourt(): number {
    return this.id;
  }
  //public setId(id: number): void { this.id = id; }
  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
    this.name = name;
  }
}
