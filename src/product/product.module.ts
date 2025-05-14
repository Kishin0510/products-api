import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuardGuard } from 'src/guard/jwt-auth-guard.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([Producto], 'productConnection'),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60d' },
    })
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtAuthGuardGuard]
})
export class ProductModule {}
