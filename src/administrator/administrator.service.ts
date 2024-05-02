import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
  private administrators: Administrator[]=[];
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository:Repository<Administrator>
    // ,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}
  //---------------------------------------------------------------------------
  


  create(createAdministratorDto: CreateAdministratorDto) {
    return 'This action adds a new administrator';
  }

  findAll() {
    return `This action returns all administrator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
