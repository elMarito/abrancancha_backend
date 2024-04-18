import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('administrators')
export class Administrator {
  @PrimaryGeneratedColumn()
  private id: number;

  // @Column()
  // private idUser: number;

  // Otros campos del administrador
  // @Column()
  // private accessLevel: number;
  // private authorizationLevel: number;

  @OneToOne(() => User, user => user.administrator)
  // @JoinColumn() //<-esta solo de un lado
  @JoinColumn( { name: 'idUser', referencedColumnName: 'id' }) //<-esta solo de un lado
  @Index({ unique: true })
  public user: User;





  

    // // Aquí establecemos la unicidad de la columna
    // @Column({ unique: true })
    // idUser: number;
  //---------------------------------------------------------------------------
    constructor( idUser: number) {
      // this.id = id;
      // this.idUser = idUser;
    }
  //---------------------------------------------------------------------------
    // Getters and Setters
    getId(): number {
      return this.id;
    }
  
    // setId(id: number): void {
    //   this.id = id;
    // }
  
    // getIdUser(): number {
    //   return this.idUser;
    // }
  
    // setIdUser(idUser: number): void {
    //   this.idUser = idUser;
    // }
  
}