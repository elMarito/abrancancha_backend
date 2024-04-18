import { IsEmail, IsHash } from 'class-validator';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { StatusOfUser } from 'src/status-of-user/entities/status-of-user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
private id: number;
  @Column()
  private fullname: string;

  @Column()
  // @IsHash('sha256')
  private passwordHash: string;

  // Si quieres incluir el campo "salt", descomenta la siguiente línea y asegúrate de agregarlo en la base de datos.
  // @Column()
  // salt: string;

  @IsEmail()
  @Column()
  private email: string;

  @Column()
  private phone: string;

  @Column()
  private avatar: string;

  // @Column()
  // private idStatus: number;

  @ManyToOne(() => StatusOfUser, statusOfUser => statusOfUser.users)
  @JoinColumn( { name: 'idStatus', referencedColumnName: 'id' })
  public status: StatusOfUser;

  @OneToOne(() => Administrator, administrator => administrator.user)
  // @JoinColumn()
  public administrator: Administrator;
  
  @OneToMany(() => Reservation, reservation => reservation.user)
  public reservations : Reservation[];
//---------------------------------------------------------------------------
constructor(
  fullname: string,
  passwordHash: string,
  email: string,
  phone?: string,
  avatar?: string,
  // token: string,
  // idStatus: number,
) {
  this.fullname = fullname;
  this.passwordHash = passwordHash;
  // this.token = token;
  this.email = email;
  this.phone = phone;
  this.avatar = avatar;
  // this.idStatus = 1; //idStatus;

    // "nombre": "Usuario Uno",
    // "password": "aA@1234",
    // "estado": "activo"
    // "nombre": "Juan",
    // "apellido": "González",
    // "categoria": 3,
    // "avatar": "https://i.pravatar.cc/300?img=1"
    
  //   "id": 1,
  //   "nombre": "Activo"
  // },
  // {
  //   "id": 2,
  //   "nombre": "Desactivado"
  // },
  // {
  //   "id": 3,
  //   "nombre": "Suspendido"
  // }
  }
//---------------------------------------------------------------------------
  // Getters and Setters
  public getId(): number {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
  }
  public setFullname(fullname: string): void {
    this.fullname = fullname;
  }

  public getPasswordHash(): string {    return this.passwordHash;  }
  public  setPasswordHash(value: string): void {    this.passwordHash = value;  }

  // public getToken(): string {    return this.token;  }
  // public  setToken(value: string): void {    this.token = value;  }
  
  public getEmail(): string {    return this.email;  }
  public  setEmail(value: string): void {    this.email = value;  }

  public getPhone(): string {    return this.phone;  }
  public  setPhone(value: string): void {    this.phone = value;  }

  public getAvatar(): string {    return this.avatar;  }
  public  setAvatar(value: string): void {    this.avatar = value;  }

  // public getIdStatus(): number {    return this.idStatus;  }
  // public  setIdStatus(value: number): void {    this.idStatus = value;  }
}
