import { Transform, Type } from 'class-transformer';
import { IsInt, IsDate, Min,Max, IsInstance, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { Int32 } from 'typeorm';


import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
  // Transforma el valor antes de guardarlo en la base de datos
  to(value: string): string {
    return value.replace(/GMT.*$/, '');
  }

  // Transforma el valor después de recuperarlo de la base de datos
  from(value: string): string {
    return value;
  }
}

@ValidatorConstraint({ name: 'IsDayOfWeekNumber' })
export class IsDayOfWeekNumber implements ValidatorConstraintInterface {
  validate(value: number): boolean {   
     return value >= 1 && value <= 7;
  }
}

export class CreateScheduleDto {
  // @IsNumber()
  @Type(()=>Int32)
  @IsInt( {message:"El dia debe ser un numero entero"}) 
  // @Min(1, {message:"El dia no puede ser menor a 1"}) 
  // @Max(7, {message:"El dia no puede ser mayor a 7"}) 
  @Validate(IsDayOfWeekNumber, { message: 'El dia debe ser >=1 y <=7' })
  readonly dayOfWeek: number;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(()=>Date)
  readonly timeFrom: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(()=>Date)
  readonly timeTo: Date;
  
  // @IsNumber()
  // idTimetable: number;
  // @IsNumber()
  // @IsInstance(Timetable)
  readonly timetable: {"name":string,"id":number}; //Timetable;
}
