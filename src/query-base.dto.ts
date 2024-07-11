import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsPositive } from 'class-validator';

export class QueryBaseDto {
  // https://www.youtube.com/watch?v=OeWqt7677Kw&ab_channel=ZestMade
  @IsOptional()
  @IsString()
  readonly search:string;
  
  @IsOptional()
  @IsString()
  readonly orderBy: string;

  @IsOptional()
  @IsString()
  readonly sort: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  // @Min(10)
  @Type(() => Number)
  readonly perPage: number;
}
