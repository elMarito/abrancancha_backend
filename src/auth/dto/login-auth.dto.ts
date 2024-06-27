import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email ingresado no es válido.' })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty({ message: 'Debe ingresar la contraseña' })
  // @MinLength(8,{message:"La contraseña ingresada no es válida. Debe contener 8 carcteres como minimo, 1 Mayuscula, 1 minuscula, 1 numero y 1"})
  // @IsStrongPassword({}, {message:"La contraseña ingresada no es válida. Debe contener 8 carcteres como minimo, 1 Mayuscula, 1 minuscula, 1 numero y 1"}) //for options check: https://github.com/validatorjs/validator.js/blob/master/src/lib/isStrongPassword.js
  password: string;
}
