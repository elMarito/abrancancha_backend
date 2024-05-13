import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateStatusOfReservationDto } from './dto/create-status-of-reservation.dto';
import { UpdateStatusOfReservationDto } from './dto/update-status-of-reservation.dto';
import { StatusOfReservation } from './entities/status-of-reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class StatusOfReservationService {
  private statusOfReservations: StatusOfReservation[] = [];

  constructor(
    @InjectRepository(StatusOfReservation)
    private readonly statusOfReservationRepository: Repository<StatusOfReservation>,
  ) {}

  public async create(
    CreateStatusOfReservationDto: CreateStatusOfReservationDto,
  ): Promise<StatusOfReservation> {
    try {
      let statusOfReservation: StatusOfReservation =
        await this.statusOfReservationRepository.save(
          new StatusOfReservation(CreateStatusOfReservationDto.name),
        );
      if (statusOfReservation) return statusOfReservation;
      else throw new Error('No se pudo crear el StatusOfReservation :(');
    } catch (error) {
      throw new NotFoundException(
        'Error en la creacion de StatusOfReservation ' + error,
      );
    }
  }

  //---------------------------------------------------------------------------

  public async getAll(): Promise<StatusOfReservation[]> {
    try {
      this.statusOfReservations =
        await this.statusOfReservationRepository.find();
      if (this.statusOfReservations) return this.statusOfReservations;
      else throw new Error('No se encuentran TypeOfCours');
    } catch (error) {
      throw new NotFoundException('Error en la busqueda :)' + error);
    }
  }

  //---------------------------------------------------------------------------
  public async findOne(
    idStatusOfReservation: number,
  ): Promise<StatusOfReservation[]> {
    try {
      const criterio: FindOneOptions = { where: { id: idStatusOfReservation } };
      let statusOfReservation: StatusOfReservation =
        await this.statusOfReservationRepository.findOne(criterio);
      this.statusOfReservations = [];
      if (statusOfReservation) {
        this.statusOfReservations.push(statusOfReservation);
      } else throw new Error('no se encuentran statusOfReservations');
      return this.statusOfReservations;
    } catch (error) {
      throw new NotFoundException('Error en la busqueda :)' + error);
    }
  }
  //---------------------------------------------------------------------------
  public async updateStatusOfReservation(
    statusOfReservationDTO: UpdateStatusOfReservationDto,
  ): Promise<StatusOfReservation> {
    try {
      let criterio: FindOneOptions = {
        where: { id: statusOfReservationDTO.idStatus },
      };
      let statusOfReservation: StatusOfReservation =
        await this.statusOfReservationRepository.findOne(criterio);
      if (!statusOfReservation)
        throw new Error('No se encuentra la StatusOfReservation');
      else statusOfReservation.setName(statusOfReservationDTO.name) ;
       statusOfReservation = await this.statusOfReservationRepository.save(statusOfReservation);
      return statusOfReservation;
    } catch (error) {
      throw new NotFoundException(
        'Error en la actualizacion de StatusOfReservation ' + error,
      );
    }
  }
  //---------------------------------------------------------------------------
  public async deleteStatusOfReservation(
    idStatusOfReservation: number,
  ): Promise<string> {
    try {
      let criterio: FindOneOptions = { where: { id: idStatusOfReservation } };
      let statusOfReservation: StatusOfReservation =
        await this.statusOfReservationRepository.findOne(criterio);
      if (!statusOfReservation)
        throw new Error('No se encuentra la StatusOfReservation');
      else
        await this.statusOfReservationRepository.delete(
          statusOfReservation.getId(),
        );
      return 'El Esteado de la Reserva fue eleiminado correctamente. ';
    } catch (error) {
      throw new NotFoundException(
        'Error en la eliminacion de StatusOfReservation ',
      );
    }
  }
}
