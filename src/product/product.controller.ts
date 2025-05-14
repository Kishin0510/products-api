import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from 'src/DTOs/add-product.dto';
import { UpdateProductDto } from 'src/DTOs/update-product.dto';
import { Producto } from '../entities/producto.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuardGuard } from 'src/guard/jwt-auth-guard.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuardGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addProduct(@Body() addProductDto: AddProductDto): Promise<Producto> {
    try {
        return await this.productService.addProduct(addProductDto);
    }  catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' };
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Producto[]; total: number }> {
    try {
        return await this.productService.findAll(page, limit);
    }  catch (error) {
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' };
    }
  }

  @Get(':sku')
  async findOne(@Param('sku', ParseUUIDPipe) sku: string): Promise<Producto> {
    try {
        return await this.productService.findOne(sku);
    } catch (error) {
        if (error.status === HttpStatus.NOT_FOUND) {
            throw error;
      }
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' };
    }
  }

  @UseGuards(JwtAuthGuardGuard)
  @Patch(':sku')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('sku', ParseUUIDPipe) sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    try {
        await this.productService.update(sku, updateProductDto);
    } catch (error) {
        if (error.status === HttpStatus.NOT_FOUND || error.status === HttpStatus.BAD_REQUEST) {
            throw error;
      }
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' };
    }
  }

  @UseGuards(JwtAuthGuardGuard)
  @Delete(':sku')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('sku', ParseUUIDPipe) sku: string): Promise<void> {
    try {
        await this.productService.remove(sku);
    } catch (error) {
        if (error.status === HttpStatus.NOT_FOUND) {
            throw error;
      }
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' };
    }
  }
}