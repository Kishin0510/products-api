import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    SKU: string;

    @Column( { length: 50})
    Nombre: string;

    @Column( { default: () => 1 } )
    Precio: number;
    
    @Column( { default: () => 0 } )
    Stock: number;

    @Column( { default: () => false } )
    Activo: boolean;
}