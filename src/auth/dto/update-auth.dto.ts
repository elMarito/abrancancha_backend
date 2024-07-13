// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './create-auth.dto';
import { Transform } from "class-transformer";
import { IsString, IsStrongPassword } from "class-validator";

export class UpdateAuthDto /* extends PartialType(CreateAuthDto) */ {
    @Transform(({ value }) => value.trim())
    @IsString()
    // @MinLength(8)
    // @Length(8, 30)
    @IsStrongPassword({}, {message:"La contraseña ingresada no es válida. Debe contener 8 carcteres como minimo, 1 Mayuscula, 1 minuscula, 1 numero y 1"}) //for options check: https://github.com/validatorjs/validator.js/blob/master/src/lib/isStrongPassword.js
    // https://github.com/validatorjs/validator.js/blob/master/README.md
    //{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, 
    // minSymbols: 1, returnScore: false, pointsPerUnique: 1, 
    // pointsPerRepeat: 0.5, pointsForContainingLower: 10, 
    // pointsForContainingUpper: 10, pointsForContainingNumber: 10, 
    // pointsForContainingSymbol: 10 }
    readonly newPassword: string 
}
