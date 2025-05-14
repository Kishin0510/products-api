import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString, Length } from "class-validator";

export class AddProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;
    
    @IsInt()
    @IsPositive()
    price: number;
    
    @IsInt()
    @IsPositive()
    stock: number;
    
    @IsBoolean()
    isActive: boolean;

}
