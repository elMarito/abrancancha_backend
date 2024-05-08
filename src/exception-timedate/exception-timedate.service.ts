import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExceptionTimedateDto } from './dto/create-exception-timedate.dto';
import { UpdateExceptionTimedateDto } from './dto/update-exception-timedate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionTimedate } from './entities/exception-timedate.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class ExceptionTimedateService {
  private exceptionTimedate: ExceptionTimedate[] = [];

  constructor(
    @InjectRepository(ExceptionTimedate)
    private readonly exceptionTimedateRepository: Repository<ExceptionTimedate>,
  ) {}

  public async create(
    createExceptionTimedateDto: CreateExceptionTimedateDto,
  ): Promise<ExceptionTimedate> {
    try {
      let exceptionTimedate:ExceptionTimedate =
        await this.exceptionTimedateRepository.save(
          new ExceptionTimedate(
            Number(createExceptionTimedateDto.dayOfWeek),
            new Date(createExceptionTimedateDto.dateFrom),
            new Date(createExceptionTimedateDto.dateTo),
          ),
        );
      if (exceptionTimedate) return exceptionTimedate;
      else throw new Error('No se pudo crear el ExceptionTimedate :(');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la creacion del ExceptionTimedate ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getAll(): Promise<ExceptionTimedate[]> {
    try {
      this.exceptionTimedate = await this.exceptionTimedateRepository.find();
      if (this.exceptionTimedate) return this.exceptionTimedate;
      else throw new Error('no se encuentran ExceptionTimedatees');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda :)' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async findOne(
    idExceptionTimedate: number,
  ): Promise<ExceptionTimedate[]> {
    try {
      const criterio: FindOneOptions = { where: { id: idExceptionTimedate } };
      let exceptionTimedate: ExceptionTimedate =
        await this.exceptionTimedateRepository.findOne(criterio);
      this.exceptionTimedate = [];
      if (exceptionTimedate) {
        this.exceptionTimedate.push(exceptionTimedate);
      } else throw new Error('no se encuentran exceptionTimedates');
      return this.exceptionTimedate;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda :' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async updateExceptionTimedate(
    exceptionTimedateDto: UpdateExceptionTimedateDto,
  ): Promise<ExceptionTimedate> {
    try {
      let criterio: FindOneOptions = { where: { id: exceptionTimedateDto.id } };
      let exceptionTimedate: ExceptionTimedate =
        await this.exceptionTimedateRepository.findOne(criterio);
      if (!exceptionTimedate) throw new error('No se encuentra la excepcion');
      else exceptionTimedate.setDateFrom(exceptionTimedateDto.dateFrom);
      exceptionTimedate.setDateTo(exceptionTimedateDto.dateTo);
      exceptionTimedate.setDayOfWeek(exceptionTimedateDto.dayOfWeek);

      exceptionTimedate =
        await this.exceptionTimedateRepository.save(exceptionTimedate);
      return exceptionTimedate;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la actualizacion de exceptionTimedate ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async eliminarexceptionTimedate(
    idexceptionTimedate: number,
  ): Promise<string> {
    try {
      let criterio: FindOneOptions = { where: { id: idexceptionTimedate } };
      let exceptionTimedate: ExceptionTimedate =
        await this.exceptionTimedateRepository.findOne(criterio);
      if (!exceptionTimedate)
        throw new error('No se encuentra la exceptionTimedate');
      else
        await this.exceptionTimedateRepository.delete(
          exceptionTimedate.getId(),
        );
      return 'El exceptionTimedate fue eliminado corectamente.';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la eliminacion de exceptionTimedate ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
