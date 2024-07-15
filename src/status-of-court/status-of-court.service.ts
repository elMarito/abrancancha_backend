import { Injectable, NotFoundException, GoneException } from '@nestjs/common';
import { CreateStatusOfCourtDto } from './dto/create-status-of-court.dto';
import { UpdateStatusOfCourtDto } from './dto/update-status-of-court.dto';
import { StatusOfCourt } from './entities/status-of-court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class StatusOfCourtService {
  private statusOfCourt: StatusOfCourt[] = [];

  constructor(
    @InjectRepository(StatusOfCourt)
    private readonly statusOfCourtRepository: Repository<StatusOfCourt>,
  ) {}
  //---------------------------------------------------------------------------------------
  public async findAll(): Promise<StatusOfCourt[]> {
    try {
      this.statusOfCourt = await this.statusOfCourtRepository.find();
      if (this.statusOfCourt) return this.statusOfCourt;
      else
        throw new NotFoundException(
          'Error in the query StatusOfCourts is not found',
        );
    } catch (error) {
      throw error;
    }
  }
  //---------------------------------------------------------------------------------------
  public async findOne(id: number): Promise<StatusOfCourt[]> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let statusOfCourt: StatusOfCourt =
        await this.statusOfCourtRepository.findOne(criterio);
      this.statusOfCourt = [];
      if (statusOfCourt) this.statusOfCourt.push(statusOfCourt);
      else throw new NotFoundException('No statusOfCourt found');
      return this.statusOfCourt;
    } catch (error) {
      throw error;
    }
  }
  //---------------------------------------------------------------------------------------
  public async create(
    createStatusOfCourtDto: CreateStatusOfCourtDto,
  ): Promise<StatusOfCourt> {
    try {
      let statusOfCourt: StatusOfCourt =
        await this.statusOfCourtRepository.save(
          new StatusOfCourt(createStatusOfCourtDto.name),
        );
      if (statusOfCourt) return statusOfCourt;
      else throw new Error('Error, the statusOfCourt could not be created ');
    } catch (error) {
      throw error;
    }
  }
  //---------------------------------------------------------------------------------------
  public async update(
    StatusOfCourtDto: UpdateStatusOfCourtDto,
  ): Promise<StatusOfCourt> {
    try {
      let criterio: FindOneOptions = { where: { id: StatusOfCourtDto.id } };
      let statusOfCourt: StatusOfCourt =
        await this.statusOfCourtRepository.findOne(criterio);
      if (!statusOfCourt) throw new GoneException('The statusOfCourt was not found');
      else statusOfCourt.setName(StatusOfCourtDto.name);
      statusOfCourt = await this.statusOfCourtRepository.save(statusOfCourt);
      return statusOfCourt;
    } catch (error) {
      throw error;
    }
  }
  //---------------------------------------------------------------------------------------
  public async remove(id: number): Promise<boolean> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let statusOfCourt: StatusOfCourt =
        await this.statusOfCourtRepository.findOne(criterio);
      if (!statusOfCourt) throw new GoneException('The statusOfCourt was not found');
      else await this.statusOfCourtRepository.delete(statusOfCourt.getId());
      return true;
    } catch (error) {
      throw error;
    }
  }
}
