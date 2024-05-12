import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusOfUserDto } from './dto/create-status-of-user.dto';
import { UpdateStatusOfUserDto } from './dto/update-status-of-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusOfUser } from './entities/status-of-user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { FindOneOptions } from 'typeorm';
import { CreateStatusOfCourtDto } from 'src/status-of-court/dto/create-status-of-court.dto';

@Injectable()
export class StatusOfUserService {
  private statusOfUser: StatusOfUser[] = [];
  
  constructor(
    @InjectRepository(StatusOfUser)
    private readonly statusOfUserRepository:Repository<StatusOfUser>){}

    
    //---------------------------------------------------------------------------------------
    public async getAll(): Promise<StatusOfUser[]> {
      try {
        this.statusOfUser = await this.statusOfUserRepository.find();
        if (this.statusOfUser)
          return this.statusOfUser
        else throw new Error('Error in the query StatusOfUser is not found');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Search error" + error
        }, HttpStatus.NOT_FOUND)
      }
    }
    public async findOne(id: number): Promise<StatusOfUser[]> {
        try {
          const criterio: FindOneOptions = { where:{ id: id }};
          let statusOfUser: StatusOfUser = await this.statusOfUserRepository.findOne(criterio);
          this.statusOfUser = [];
          if (statusOfUser){
            this.statusOfUser.push(statusOfUser)
          }
          else throw new Error('No statusOfUser found');
          return this.statusOfUser;
        } catch (error) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND, error: "Fare search error :" + error
          }, HttpStatus.NOT_FOUND)
    
        }
      }  
  
    //------------------------------------------------------------------------
    public async getById(id : number) : Promise<StatusOfUser[]> {
      try {
          const criterio : FindOneOptions = { relations: [ 'user' ], where: { idStatus: id } }
          let statusOfUser : StatusOfUser = await this.statusOfUserRepository.findOne( criterio );
          this.statusOfUser = [];
          if (statusOfUser) 
              this.statusOfUser.push(statusOfUser);
          else
              throw new Error('No statusOfUser found')
          return this.statusOfUser;
      } catch (error) {
          throw new HttpException( {
              status : HttpStatus.NOT_FOUND, error : 'Fare search error ' + id + ' : ' + error 
          }, HttpStatus.NOT_FOUND);
      }
  }

  public async create(statusOfUserDto: CreateStatusOfUserDto): Promise<StatusOfUser> {
    try {
      let statusOfUser: StatusOfUser = await this.statusOfUserRepository.save(new StatusOfUser  (
        CreateStatusOfCourtDto.name));
      if (statusOfUser)
        return statusOfUser;
      else
        throw new Error('Error, the statusOfUser could not be created ');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error, the statusOfUser could not be created '+ error
      }, HttpStatus.NOT_FOUND);
    }

  }

  public async update(statusOfUserDto : UpdateStatusOfUserDto) : Promise<StatusOfUser> {
    try {
        let criterio : FindOneOptions = { where:{id:statusOfUserDto.id}};
        let statusOfUser : StatusOfUser = await this.statusOfUserRepository.findOne(criterio);
        if (!statusOfUser)
           throw new Error('The statusOfUser was not found');
        else
           statusOfUser.setName(statusOfUserDto.name);
           statusOfUser = await this.statusOfUserRepository.save(statusOfUser);
        return statusOfUser;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'StatusofUser update error '+error}, HttpStatus.NOT_FOUND);
     }
     }

     public async delete(id:number) : Promise<boolean> {
      try {
         let criterio : FindOneOptions = {where:{id:id}};
         let statusOfUser : StatusOfUser = await this.statusOfUserRepository.findOne(criterio);
         if (!statusOfUser)
            throw new Error('The statusOfUser was not found');
         else
            await this.statusOfUserRepository.delete(statusOfUser.getId());
         return (true)
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'StatusOfUser elimination error '+error}, HttpStatus.NOT_FOUND);
      }
    }   

  findAll() {
    return `This action returns all statusOfUser`;
  }
  remove(id: number) {
    return `This action removes a #${id} statusOfUser`;
  }

  
}
