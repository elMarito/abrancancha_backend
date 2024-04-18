//export class StatusOfUser {}
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,  
} from 'typeorm';

@Entity('statusOfUser')
export class StatusOfUser {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private name: string;

  @OneToMany(() => User, user => user.status)
  public users: User[];
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
