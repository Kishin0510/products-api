import { DataSource } from 'typeorm';
import { Producto } from '../entities/producto.entity';

const products = Array.from({ length: 51 }, (_, i) => ({
  Nombre: `Producto ${i + 1}`,
  Precio: Math.floor(Math.random() * 999999) + 1, 
  Stock: Math.floor(Math.random() * 999) + 1,  
  Activo: true,
}));

export async function seedProducts(dataSource: DataSource): Promise<void> {
  const productRepository = dataSource.getRepository(Producto);

  console.log('Eliminando productos existentes...');
  await productRepository.clear();

  console.log('Insertando productos de prueba...');
  await productRepository.save(products);

  console.log('Productos insertados correctamente.');
}