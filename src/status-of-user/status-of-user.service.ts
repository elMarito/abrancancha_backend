import { Injectable, NotFoundException, GoneException } from '@nestjs/common';
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
    private readonly statusOfUserRepository: Repository<StatusOfUser>,
  ) {}
  //----------------------------------------------------------------------------
  public async findAll(): Promise<StatusOfUser[]> {
    try {
      this.statusOfUser = await this.statusOfUserRepository.find();
      if (this.statusOfUser) return this.statusOfUser;
      else
        throw new NotFoundException(
          'Error in the query StatusOfUser is not found',
        );
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async findOne(id: number): Promise<StatusOfUser[]> {
    try {
      // const criterio: FindOneOptions = { where: { id: id } };
      // let statusOfUser: StatusOfUser =
      //   await this.statusOfUserRepository.findOne(criterio);
      const statusOfUser = await this.getStatusOfUserById(id);      
      this.statusOfUser = [];
      if (statusOfUser) this.statusOfUser.push(statusOfUser);
      else throw new NotFoundException('No statusOfUser found');
      return this.statusOfUser;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async create(
    statusOfUserDto: CreateStatusOfUserDto,
  ): Promise<StatusOfUser> {
    try {
      let statusOfUser: StatusOfUser = await this.statusOfUserRepository.save(
        new StatusOfUser(CreateStatusOfCourtDto.name),
      );
      if (statusOfUser) return statusOfUser;
      else throw new Error('Error, the statusOfUser could not be created ');
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async update(
    statusOfUserDto: UpdateStatusOfUserDto,
  ): Promise<StatusOfUser> {
    try {
      // let criterio: FindOneOptions = { where: { id: statusOfUserDto.id } };
      // let statusOfUser: StatusOfUser =
      //   await this.statusOfUserRepository.findOne(criterio);
      const statusOfUser:StatusOfUser = await this.getStatusOfUserById(statusOfUserDto.id);
      if (!statusOfUser)
        throw new GoneException('The statusOfUser was not found');
      statusOfUser.setName(statusOfUserDto.name);
      const statusOfUserUpdated: StatusOfUser = await this.statusOfUserRepository.save(statusOfUser);
      return statusOfUserUpdated;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async remove(id: number): Promise<boolean> {
    try {
      // let criterio: FindOneOptions = { where: { id: id } };
      // let statusOfUser: StatusOfUser =
      //   await this.statusOfUserRepository.findOne(criterio);
      const statusOfUser = await this.getStatusOfUserById(id);
      if (!statusOfUser)
        throw new GoneException('The statusOfUser was not found');
      await this.statusOfUserRepository.delete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private async getStatusOfUserById(idStatusOfUser: number): Promise<StatusOfUser> {
    const criterio: FindOneOptions = { where: { id: idStatusOfUser } };
    return await this.statusOfUserRepository.findOne(criterio);
  }
}
