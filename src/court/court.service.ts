import { Inject, Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { Court } from './entities/court.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


const ERROR_ENTITY = 'cancha';
const ERROR_ENTITY_LOWER = `la ${ERROR_ENTITY}`;
const ERROR_ENTITY_UCASE = `La ${ERROR_ENTITY}`;
const ERROR_ENTITIES = 'reservas';
const ERROR_MSG = {
  NOT_FOUND: `${ERROR_ENTITY_UCASE} no se encuentra.`,
  NOT_FOUND_ANY: `No se encuentran ${ERROR_ENTITIES}.`,
  REPEATED: `${ERROR_ENTITY_UCASE} ya se encuentra.`,
  CANT_CREATE: `No se pudo crear ${ERROR_ENTITY_LOWER}`,
  // CANT_UPDATE: `No hay datos para modificar ${ERROR_ENTITIES}.`,
  // CANT_DELETE: `No hay datos para eliminar ${ERROR_ENTITIES}.`,
  NO_DATA_4: {
    CREATE: `No hay datos para crear ${ERROR_ENTITIES}.`,
    UPDATE: `No hay datos para modificar ${ERROR_ENTITIES}.`,
    DELETE: `No hay datos para eliminar ${ERROR_ENTITIES}.`,
  },
  INVALID_ID: `El ID de ${ERROR_ENTITY} provisto no es válido.`,
  INVALID_DATA_4: {
    CREATE: `Los datos para crear ${ERROR_ENTITY_LOWER} no son validos`,
    UPDATE: `Los datos para modificar ${ERROR_ENTITY_LOWER} no son validos`,
  },
};

@Injectable()
export class CourtService {

  private courts :Court[]=[];

  constructor(
    @InjectRepository(Court)
    private readonly courtRespository:Repository<Court>
  ){}

  //---------------------------------------------------------------------------

  create(createCourtDto: CreateCourtDto) {
    return 'This action adds a new court';
  }

  findAll() {
    return `This action returns all court`;
  }

  findOne(id: number) {
    return `This action returns a #${id} court`;
  }

  update(id: number, updateCourtDto: UpdateCourtDto) {
    return `This action updates a #${id} court`;
  }

  remove(id: number) {
    return `This action removes a #${id} court`;
  }
}
