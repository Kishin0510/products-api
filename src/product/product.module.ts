import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Producto], 'productConnection')],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
