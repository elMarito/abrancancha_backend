import { Court } from 'src/court/entities/court.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity("tariffs")
export class Tariff {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Assuming 'currency' is represented as a decimal in the database
  private price: number;

  @OneToMany(() => Court, court => court.tariff)
  public courts: Court[];
//---------------------------------------------------------------------------
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
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

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }
}
