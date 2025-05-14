import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    SKU: string;

    @Column( { length: 50})
    Nombre: string;

    @Column({ type: 'int', default: 1 }) 
    Precio: number;

    @Column({ type: 'int', default: 0 }) 
    Stock: number;

    @Column({ type: 'boolean', default: true }) 
    Activo: boolean;
}