import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Введите корректный email' })
    email: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsString()
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    password: string;
}