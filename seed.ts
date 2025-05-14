import { DataSource } from 'typeorm';
import { AuthUserEntity } from 'src/entities/auth-user.entity'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Producto } from 'src/entities/producto.entity'; 
import { seedProducts } from 'src/seed/seed-products'; 
async function runSeed() {
    ConfigModule.forRoot({
        isGlobal: true,
    });
    const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3000', 10),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'products_db',
        entities: [AuthUserEntity, Producto],
        synchronize: true, 
    });

    try {
        console.log('Inicializando conexión a la base de datos...');
        await dataSource.initialize();

        console.log('Iniciando semillas...');
        await seedProducts(dataSource);
        console.log('Semillas completadas.');
    } catch (error) {
        console.error('Error al ejecutar las semillas:', error);
    } finally {
        await dataSource.destroy();
    }
}

runSeed();