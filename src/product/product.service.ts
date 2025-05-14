import { Injectable, HttpException, HttpStatus, Inject, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { UpdateProductDto } from 'src/DTOs/update-product.dto';
import { AddProductDto } from 'src/DTOs/add-product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Producto, 'productConnection') private readonly productRepository: Repository<Producto>,
  ) {}
    
    async addProduct(product: AddProductDto): Promise<Producto> {
      try {
        const { name, price, stock } = product;
        const newProduct = this.productRepository.create({ Nombre: name, Precio: price, Stock: stock });
        await this.productRepository.save(newProduct);
        return newProduct;
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al agregar el producto');
      }
    }

    async findAll(page = 1, limit = 10): Promise<{ data: Producto[]; total: number }> {
      try {
        const [data, total] = await this.productRepository.findAndCount({
          where: { Activo: true },
          skip: (page - 1) * limit,
          take: limit,
          order: { Nombre: 'ASC' },
        });

        return { data, total };
      } catch (error) {
        throw new InternalServerErrorException('Error al obtener los productos');
      }
    }

    async findOne(SKU: string): Promise<Producto> {
      try {
        const producto = await this.productRepository.findOne({ where: { SKU, Activo: true } });
        if (!producto) {
          throw new NotFoundException('Producto no encontrado');
        }
        return producto;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al obtener el producto');
      }
    }

    async update(SKU: string, updateDto: UpdateProductDto): Promise<void> {
      try {
        const producto = await this.findOne(SKU);
        Object.assign(producto, updateDto);
        await this.productRepository.save(producto);
      } catch (error) {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al actualizar el producto');
      }
    }

    async remove(SKU: string): Promise<void> {
      try {
        const producto = await this.findOne(SKU);
        producto.Activo = false;
        await this.productRepository.save(producto);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al eliminar el producto');
      }
    }
}
