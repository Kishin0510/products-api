import { IsInt, IsNotEmpty, IsPositive, IsString, Length } from "class-validator";

export class AddProductDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
    name: string;
    
    @IsInt({ message: 'El precio debe ser un número entero' })
    @IsPositive({ message: 'El precio debe ser mayor a 0' })
    @IsNotEmpty({ message: 'El precio no puede estar vacío' })
    price: number;
    
    @IsInt({ message: 'El stock debe ser un número entero' })
    @IsNotEmpty({ message: 'El stock no puede estar vacío' })
    @IsPositive({ message: 'El stock debe ser mayor o igual a 0' })
    stock: number;

}
