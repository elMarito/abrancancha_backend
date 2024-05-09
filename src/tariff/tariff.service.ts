import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private readonly tariffRepository:Repository<Tariff>){}

    
    //---------------------------------------------------------------------------------------
    public async getAll(): Promise<Tariff[]> {
      try {
        this.tariffs = await this.tariffRepository.find();
        if (this.tariffs)
          return this.tariffs
        else throw new Error('Error in the query Tariff is not found');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Search error" + error
        }, HttpStatus.NOT_FOUND)
      }
    }
    public async findOne(id: number): Promise<Tariff[]> {
        try {
          const criterio: FindOneOptions = { where:{ id: id }};
          let tariff: Tariff = await this.tariffRepository.findOne(criterio);
          this.tariffs = [];
          if (tariff){
            this.tariffs.push(tariff)
          }
          else throw new Error('No tariff found');
          return this.tariffs;
        } catch (error) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND, error: "Fare search error :" + error
          }, HttpStatus.NOT_FOUND)
    
        }
      }  
  
    //------------------------------------------------------------------------
    public async getById(id : number) : Promise<Tariff[]> {
      try {
          const criterio : FindOneOptions = { relations: [ 'courts' ], where: { id: id } }
          let tariff : Tariff = await this.tariffRepository.findOne( criterio );
          this.tariffs = [];
          if (tariff) 
              this.tariffs.push(tariff);
          else
              throw new Error('No tariff found')
          return this.tariffs;
      } catch (error) {
          throw new HttpException( {
              status : HttpStatus.NOT_FOUND, error : 'Fare search error ' + id + ' : ' + error 
          }, HttpStatus.NOT_FOUND);
      }
  }

  public async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    try {
      let tariff: Tariff = await this.tariffRepository.save(new Tariff  (
        createTariffDto.name, createTariffDto.price));
      if (tariff)
        return tariff;
      else
        throw new Error('Error, the tariff could not be created ');

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error, the tariff could not be created '+ error
      }, HttpStatus.NOT_FOUND);
    }

  }

  public async updateTariff(TariffDTO : UpdateTariffDto) : Promise<Tariff> {
    try {
        let criterio : FindOneOptions = { where:{id:TariffDTO.id}};
        let tariff : Tariff = await this.tariffRepository.findOne(criterio);
        if (!tariff)
           throw new Error('The tariff was not found');
        else
           tariff.setName(TariffDTO.name);
           tariff.setPrice(TariffDTO.price);
        tariff = await this.tariffRepository.save(tariff);
        return tariff;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'Tariff update error '+error}, HttpStatus.NOT_FOUND);
     }
     }

     public async deleteTariff(id:number) : Promise<boolean> {
      try {
         let criterio : FindOneOptions = {where:{id:id}};
         let tariff : Tariff = await this.tariffRepository.findOne(criterio);
         if (!tariff)
            throw new Error('The tariff was not found');
         else
            await this.tariffRepository.delete(tariff.getId());
         return (true)
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'Tariff elimination error '+error}, HttpStatus.NOT_FOUND);
      }
    }   

  findAll() {
    return `This action returns all tariff`;
  }

  remove(id: number) {
    return `This action removes a #${id} tariff`;
  }
}
