import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { IsEmail } from 'class-validator';


@Injectable()
export class ClubService {

    private club :Club[]=[];

    constructor(@InjectRepository(Club)private readonly clubRepository: Repository<Club>){}


    public async create(createClubDto: CreateClubDto): Promise<Club> {
      try {
        let club: Club = await this.clubRepository.save(new Club(
          createClubDto.name,createClubDto.address,createClubDto.phone,createClubDto.email));
        if (club)
          return club;
        else
          throw new Error('No se pudo crear el Club :(');
  
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la creacion del Club '+ error
        }, HttpStatus.NOT_FOUND);
      }
  
    }

    public async getAll(): Promise<Club[]> {
      try {
        this.club= await this.clubRepository.find();
        if (this.club)
          return this.club
        else throw new Error('no se encuentran Clubes');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :)" + error
        }, HttpStatus.NOT_FOUND)
      }
  
    }

    public async findOne(idClub: number): Promise<Club[]> {
      try {
        const criterio: FindOneOptions = { where:{ id: idClub }};
        let club: Club = await this.clubRepository.findOne(criterio);
        this.club = [];
        if (club){
          this.club.push(club)
        }
        else throw new Error('no se encuentran Clubs');
        return this.club;
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND, error: "Error en la busqueda :" + error
        }, HttpStatus.NOT_FOUND)
  
      }
    }

  public async updateClub(clubDto : UpdateClubDto) : Promise<Club> {
    try {
        let criterio : FindOneOptions = { where:{id:clubDto.id}};
        let club : Club = await this.clubRepository.findOne(criterio);
        if (!club)
           throw new Error('No se encuentra el Club');
        else
           club.setName(clubDto.name);
          club.setEmail(clubDto.email);
          club.setAddress(clubDto.address); 
          club.setPhone(clubDto.phone);
        club = await this.clubRepository.save(club);
        return club;
     } catch (error) {
           throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                 error : 'Error en la actualizacion de Club '+error}, HttpStatus.NOT_FOUND);
     }
     }

     public async eliminarClub(idClub:number) : Promise<string> {
      try {
         let criterio : FindOneOptions = {where:{id:idClub}};
         let club : Club = await this.clubRepository.findOne(criterio);
         if (!club)
            throw new Error('No se encuentra la club');
         else
            await this.clubRepository.delete(club.getId());
         return ("El club fue eliminado corectamente.")
      } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                  error : 'Error en la eliminacion de club '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
