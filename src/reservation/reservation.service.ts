import {  BadRequestException,  ConflictException} from '@nestjs/common';
import {  GoneException,  InternalServerErrorException} from '@nestjs/common';
import {  NotFoundException,  Injectable} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  FindManyOptions,  FindOneOptions} from 'typeorm';
import {  QueryFailedError,  Repository} from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { ResponseObject, ServiceResponseOk } from 'src/utilities';
import { Court } from 'src/court/entities/court.entity';

const ERROR_ENTITY = 'reserva';
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
export class ReservationService {
  private reservations: Reservation[] = [];
  reservationsForUsers: any[];

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    // @InjectRepository(User) //**quizas esto no va */
    // private readonly userRepository: Repository<User>,
  ) {}
  //---------------------------------------------------------------------------
 //---------------------------------------------------------------------------
 public async create(datos: CreateReservationDto): Promise<Reservation> {
  console.log('Datos recibidos para crear reserva:', datos);
  try {
    const formattedDate = new Date(datos.timedate).toISOString().slice(0, 19).replace('T', ' ');
    const reservation: Reservation = await this.reservationRepository.save(
      new Reservation(
        datos.user,
        datos.court,
        formattedDate,
        Number(datos.price),
        // datos.status
      ),
    );

    if (reservation) return reservation;
    throw new Error('Error creando la reserva: \n' + 'Error inesperado');
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw new InternalServerErrorException('Error inesperado al crear la reserva');
  }
}

  //---------------------------------------------------------------------------
  public async findAll(id?:string): Promise<Reservation[]> {
    if(id){
      const criterio:FindOneOptions ={where:{id:id}};
      let reservationForUser:Reservation=
      await this.reservationRepository.findOne(criterio)
      this.reservationsForUsers=[];
      this.reservationsForUsers.push(reservationForUser)
    return this.reservationsForUsers
    }
    this.reservations = await this.reservationRepository.find();
    if (this.reservations) return this.reservations;
    throw new NotFoundException(
      'Error en la busqueda: ',
      ERROR_MSG.NOT_FOUND_ANY,
      
    );
  }
  //---------------------------------------------------------------------------
  public async findOne(idReservation: number): Promise<Reservation[]> {
    const criterio: FindOneOptions = { where: { id: idReservation } };
    let reservation: Reservation =
      await this.reservationRepository.findOne(criterio);

    this.reservations = [];
    if (reservation) this.reservations.push(reservation);
    else throw new Error(ERROR_MSG.NOT_FOUND);
    return this.reservations;
  }

  //--------------------------------------------------------------------------- 
  

  //---------------------------------------------------------------------------
  public async update(
    idReservation: number,
    datos: UpdateReservationDto,
  ): Promise<ResponseObject> {
    if (!idReservation) throw new BadRequestException(ERROR_MSG.INVALID_ID);
    if (!datos) throw new BadRequestException(ERROR_MSG.NO_DATA_4.UPDATE);

    let reservation: Reservation = await this.getReservationById(idReservation);

    if (reservation == null) throw new GoneException(ERROR_MSG.NOT_FOUND);

    //si modifico el email, chequear que no ponga un email de otro
    // if (datos.email && reservation.getEmail() !== datos.email) {
    //   // console.log(user.getEmail(),datos.email);
    //   const otherUser: User = await this.getUserByEmail(datos.email);
    //   if (otherUser.getId() != idReservation)
    //     throw new ConflictException(
    //       'el email elegido pertenece a otro usuario.',
    //     );
    // }

    // reservation.setUser(datos.user);
    // reservation.setCourt(datos.court);
    // reservation.setTimedate(datos.timedate);
    reservation.setStatus(datos.status);
    const reservationUpdated: Reservation =
      await this.reservationRepository.save(reservation);
    //else
    //  throw new Error(ERROR_MSG.INVALID_DATA_4.UPDATE);

    return ServiceResponseOk(
      `${ERROR_ENTITY_UCASE} se ha actualizado exitosamente.`,
      reservationUpdated,
    );
  }
  //---------------------------------------------------------------------------
  public async remove(id: number): Promise<ResponseObject> {
    if (!id) throw new BadRequestException(ERROR_MSG.NO_DATA_4.DELETE);

    const userExists = await this.existReservationId(id);
    if (!userExists) throw new GoneException(ERROR_MSG.NOT_FOUND);

// TODO
//chequear: si la fecha ya paso no se puede borrar
// la reserva ya expiro, no se puede borrar.

    await this.reservationRepository.delete(id);

    return ServiceResponseOk('Reserva borrada exitosamente.');

    // return `This action removes a #${id} reservation`;
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private async getReservationById(
    idReservation: number,
  ): Promise<Reservation> {
    const criterio: FindOneOptions = { where: { id: idReservation } };
    return await this.reservationRepository.findOne(criterio);
  }
  //---------------------------------------------------------------------------
  private async getReservationsByCourt(court: Court): Promise<Reservation[]> {
    // const criterio: FindManyOptions = { relations: ['StatusOfUser','Reservation','Administrator'] };
    // const criterio: FindManyOptions = { relations: ['Court'], where: { court: court } };
    const criterio: FindManyOptions = { where: { court: court } };
    return await this.reservationRepository.find(criterio);
  }
  //---------------------------------------------------------------------------
  private async existReservationId(idReservation: number): Promise<boolean> {
    // const criterio: FindOneOptions = { where: { id: idReservation } };
    const reservation: Reservation =
      await this.getReservationById(idReservation);
    return reservation != null;
  }
}
