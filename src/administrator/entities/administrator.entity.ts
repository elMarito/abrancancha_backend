import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('administrators')
export class Administrator {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private idUser: number;

  // Otros campos del administrador
  // @Column()
  // private accessLevel: number;
  // private authorizationLevel: number;

  @OneToOne(() => User, (user) => user.administrator)
  @JoinColumn()
  public user: User;
  //---------------------------------------------------------------------------
    constructor( idUser: number) {
      // this.id = id;
      this.idUser = idUser;
    }
  //---------------------------------------------------------------------------
    // Getters and Setters
    getId(): number {
      return this.id;
    }
  
    // setId(id: number): void {
    //   this.id = id;
    // }
  
    getIdUser(): number {
      return this.idUser;
    }
  
    setIdUser(idUser: number): void {
      this.idUser = idUser;
    }
  
}