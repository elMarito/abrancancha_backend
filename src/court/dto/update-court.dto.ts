import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtDto } from './create-court.dto';
import { Tariff } from 'src/tariff/entities/tariff.entity';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
   
    
}
