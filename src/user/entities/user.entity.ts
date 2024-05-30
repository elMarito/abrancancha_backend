import { IsEmail, IsHash, IsNotEmpty, MaxLength } from 'class-validator';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { StatusOfUser } from 'src/status-of-user/entities/status-of-user.entity';
// import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  @IsNotEmpty()
  // @ApiProperty({ description: 'Una o mas palabras separadas por espacios' })
  private fullname: string;

  @Column({ nullable: false })
  // @Column({select: false}) //<-si uso esto no funciona el getPasswordHash
  // @Column({ nullable: false, select: false })
  @IsNotEmpty()
  @MaxLength(256)
  // @IsHash('sha256') Checks if the string is a hash The following types are supported:md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.
  // @IsHash no funcion con bcryptjs
  private passwordHash: string;

  // Si quieres incluir el campo "salt", descomenta la siguiente línea y asegúrate de agregarlo en la base de datos.
  // @Column()
  // salt: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  private email: string;

  @Column()
  private phone: string;

  @Column()
  private avatar: string;

  // @Column()
  private idStatus: number;
  // @Column()
  // private role: string | enum;

  @ManyToOne(() => StatusOfUser, (statusOfUser) => statusOfUser.users)
  @JoinColumn({ name: 'idStatus', referencedColumnName: 'id' })
  public status: StatusOfUser;

  @OneToOne(() => Administrator, (administrator) => administrator.user)
  public administrator: Administrator;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  public reservations: Reservation[];
  //---------------------------------------------------------------------------
  constructor(
    fullname: string,
    passwordHash: string,
    email: string,
    phone?: string,
    avatar?: string,
    // salt: string,
    // idStatus: number,
  ) {
    this.fullname = fullname;
    this.passwordHash = passwordHash;
    // this.salt = crypto.getRandomValues();
    this.email = email;
    this.phone = phone || '';
    this.avatar = avatar || '';
    this.idStatus = 1;
    // this.status={id:1,name:"Activo"};
    // "nombre": "Usuario Uno",
    // "estado": "activo"
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

  public getPasswordHash(): string {
    return this.passwordHash;
  }
  public setPasswordHash(value: string): void {
    this.passwordHash = value;
  }

  // public getSalt(): string {    return this.salt;  }
  // public  setSalt(value: string): void {    this.salt = value;  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string): void {
    this.email = value;
  }

  public getPhone(): string {
    return this.phone;
  }
  public setPhone(value: string): void {
    this.phone = value;
  }

  public getAvatar(): string {
    return this.avatar;
  }
  public setAvatar(value: string): void {
    this.avatar = value;
  }
  //---------------------------------------------------------------------------
  public getReservations(): Reservation[] {
    return this.reservations;
  }
  //public hasReservations(): boolean
  public isAdministrator(): boolean {
    return this.administrator !== null;
  }

  // public getIdStatus(): number {    return this.idStatus;  }
  // public  setIdStatus(value: number): void {    this.idStatus = value;  }
}

//Role
//https://orkhan.gitbook.io/typeorm/docs/entities#column-types
// export enum UserRole {
//   ADMIN = "admin",
//   EDITOR = "editor",
//   GHOST = "ghost",
// }
