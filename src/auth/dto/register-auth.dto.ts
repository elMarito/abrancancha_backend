import { Transform } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsString, IsStrongPassword, Length, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @Length(3, 30)
    @IsAlphanumeric()
    readonly fullname: string;

    @IsString()
    @IsEmail()
    readonly email: string; 

    @Transform(({ value }) => value.trim())
    @IsString()
    // @MinLength(8)
    // @Length(8, 30)
    @IsStrongPassword() //for options check: https://github.com/validatorjs/validator.js/blob/master/src/lib/isStrongPassword.js
    readonly password: string
}