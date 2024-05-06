import {
  IsString,
  IsHash,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El campo "fullname" debe ser una cadena de texto.' })
  @IsNotEmpty({
    message: 'El nombre no debe ser una cadena vacia.',
  })
  @MaxLength(256, {
    message: 'Nombre demasiado largo. Max 256 caracteres.',
  })
  // @ApiProperty({ description: 'Nombre completo del usuario' })
  readonly fullname: string;
  //---------------------------------------------------------------------------
  // @IsString()
  @IsEmail(
    {},
    {
      message: 'El email ingresado no es válido.',
    },
  )
  readonly email: string;
  //---------------------------------------------------------------------------
  // Checks if the string is a hash The following types are supported:
  // md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128,
  // tiger160, tiger192, crc32, crc32b.
  // @IsHash('sha256', {
  //   message: 'La clave debe ser un hash SHA-256 válido',
  // })
  @IsString({
    message: 'La clave debe ser una cadena alfanumerica valida',
  })
  @IsNotEmpty({
    message: 'El contraseña no debe ser una cadena vacia.',
  })
  readonly password: string;
  //---------------------------------------------------------------------------
  // @IsOptional()
  // @IsString()
  //   readonly salt: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;
  //---------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  readonly avatar?: string;
  //---------------------------------------------------------------------------
  // @IsInt()
  @IsNumber()
  readonly idStatus?: number = 1;
}
