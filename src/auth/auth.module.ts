import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserEntity } from 'src/entities/auth-user.entity';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
      imports: [
        TypeOrmModule.forFeature([AuthUserEntity], 'productConnection'),

        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '60d' },
            }),
        }),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
