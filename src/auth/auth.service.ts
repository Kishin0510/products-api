import { Injectable, HttpException, HttpStatus, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../DTOs/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthUserEntity, 'productConnection') private authRepository: Repository<AuthUserEntity>,
    ) {}


    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.authRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user && isPasswordValid) { 
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(AuthDto: AuthDto): Promise<{ accessToken: string }> {
        const { email, password } = AuthDto;
        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    async register(registerDto: AuthDto): Promise<{ message: string }> {
        const { email, password } = registerDto;

        const existingUser = await this.authRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.authRepository.create({ email, password: hashedPassword });
        try {
            await this.authRepository.save(newUser);
            return { message: 'Usuario registrado exitosamente' };
        } catch (error) {
            throw new InternalServerErrorException('Error al registrar el usuario');
        }
    }

    async verifyToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}
