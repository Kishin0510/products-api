import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(3, { message: 'La contraseña debe tener al menos 3 caracteres' })
    password: string;
}
