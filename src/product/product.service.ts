import { Injectable, HttpException, HttpStatus, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { UpdateProductDto } from 'src/DTOs/update-product.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Producto, 'productConnection') private readonly productRepository: Repository<Producto>,
    ) {}
    
    async addProduct(product: Producto): Promise<Producto> {
        const newProduct = this.productRepository.create(product);
        return await this.productRepository.save(newProduct);
    }

    async findAll(page = 1, limit = 10): Promise<{ data: Producto[]; total: number }> {
        const [data, total] = await this.productRepository.findAndCount({
        where: { Activo: true },
        skip: (page - 1) * limit,
        take: limit,
        order: { Nombre: 'ASC' },
        });
        return { data, total };
    }

    async findOne(SKU: string): Promise<Producto> {
    const producto = await this.productRepository.findOne({ where: { SKU, Activo: true } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
    }

    async update(SKU: string, updateDto: UpdateProductDto): Promise<void> {
    const producto = await this.findOne(SKU);
    Object.assign(producto, updateDto);

    try {
      await this.productRepository.save(producto);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el producto');
        }
    }

    async remove(SKU: string): Promise<void> {
    const producto = await this.findOne(SKU);
    producto.Activo = false;

    try {
      await this.productRepository.save(producto);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }

}
