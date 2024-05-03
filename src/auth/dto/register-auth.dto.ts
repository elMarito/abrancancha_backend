import { Transform } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsOptional, IsString, IsStrongPassword, Length, Matches, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @Length(3, 30,{ message: 'El nombre de usuario debe tener entre 3 y 30 caracteres.' })
    @Matches(/^[\w\s]+$/, {
        message: 'El formato no es válido. Solo se pueden separar con espacios.'
      })
    readonly fullname: string;

    @IsString()
    @IsEmail({}, {message:"El email ingresado no es válido"}) 
    readonly email: string; 

    @Transform(({ value }) => value.trim())
    @IsString()
    // @MinLength(8)
    // @Length(8, 30)
    @IsStrongPassword({}, {message:"La contraseña ingresada no es valida. Debe contener 8 carcteres como minimo, 1 Mayuscula, 1 minuscula, 1 numero y 1"}) //for options check: https://github.com/validatorjs/validator.js/blob/master/src/lib/isStrongPassword.js
    // https://github.com/validatorjs/validator.js/blob/master/README.md
    //{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, 
    // minSymbols: 1, returnScore: false, pointsPerUnique: 1, 
    // pointsPerRepeat: 0.5, pointsForContainingLower: 10, 
    // pointsForContainingUpper: 10, pointsForContainingNumber: 10, 
    // pointsForContainingSymbol: 10 }
    readonly password: string
    
  // @IsOptional()
  // @IsString()
  // readonly phone?: string;
}