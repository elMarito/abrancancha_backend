import { Injectable, NotFoundException, GoneException } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { Tariff } from './entities/tariff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TariffService {
  private tariffs: Tariff[] = [];

  constructor(
    @InjectRepository(Tariff)
    private readonly tariffRepository: Repository<Tariff>,
  ) {}
  //----------------------------------------------------------------------------
  public async findAll(): Promise<Tariff[]> {
    try {
      this.tariffs = await this.tariffRepository.find();
      if (this.tariffs) return this.tariffs;
      else throw new NotFoundException('Error in the query Tariff is not found');
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async findOne(id: number): Promise<Tariff[]> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let tariff: Tariff = await this.tariffRepository.findOne(criterio);
      this.tariffs = [];
      if (tariff) this.tariffs.push(tariff);
      else throw new NotFoundException('No tariff found');
      return this.tariffs;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    try {
      let tariff: Tariff = await this.tariffRepository.save(
        new Tariff(createTariffDto.name, createTariffDto.price),
      );
      if (tariff) return tariff;
      else throw new Error('Error, the tariff could not be created ');
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async updateTariff(TariffDTO: UpdateTariffDto): Promise<Tariff> {
    try {
      let criterio: FindOneOptions = { where: { id: TariffDTO.id } };
      let tariff: Tariff = await this.tariffRepository.findOne(criterio);
      if (!tariff) throw new GoneException('The tariff was not found');
      else tariff.setName(TariffDTO.name);
      tariff.setPrice(TariffDTO.price);
      tariff = await this.tariffRepository.save(tariff);
      return tariff;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------
  public async remove(id: number): Promise<boolean> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let tariff: Tariff = await this.tariffRepository.findOne(criterio);
      if (!tariff) throw new GoneException('The tariff was not found');
      else await this.tariffRepository.delete(tariff.getId());
      return true;
    } catch (error) {
      throw error;
    }
  }
}
