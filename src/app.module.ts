import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Producto } from './entities/producto.entity';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserEntity } from './entities/auth-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    TypeOrmModule.forRoot({
      name: 'productConnection',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Producto, AuthUserEntity],
      synchronize: true,
    }),

    ProductModule,
    AuthModule,

    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    static initialize() {
        throw new Error('Method not implemented.');
    }
}
