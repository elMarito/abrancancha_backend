import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("club")
export class Club {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @Column()
  private address: string;

  @Column()
  private phone: string;

  @Column()
  private email: string;

  // Si deseas agregar la columna para la tarifa, deberías descomentarla y definirla adecuadamente
  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  // tariff: number;
//---------------------------------------------------------------------------
  constructor( name: string, address: string, phone: string, email: string) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    // Si tienes la columna para la tarifa, también deberías asignarla en el constructor
    // this.tariff = tariff;
  }
//---------------------------------------------------------------------------
    // Getters and Setters
  getId(): number {    return this.id; }
//   setId(id: number): void {    this.id = id;  }
  getName(): string {    return this.name;  }
  setName(name: string): void {    this.name = name;  }
  getAddress(): string {    return this.address;  }
  setAddress(address: string): void {    this.address = address;  }
  getPhone(): string {    return this.phone;  }
  setPhone(phone: string): void {    this.phone = phone;  }
  getEmail(): string {    return this.email;  }
  setEmail(email: string): void {    this.email = email;  }

  // Si tienes la columna para la tarifa, también deberías definir getters y setters para ella
  // getTariff(): number {
  //   return this.tariff;
  // }
  //
  // setTariff(tariff: number): void {
  //   this.tariff = tariff;
  // }
}