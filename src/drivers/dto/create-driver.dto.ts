import {
  IsString,
  IsEmail,
  IsEnum,
  IsDate,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LicenseCategory, DriverStatus } from '../schemas/driver.schema';

export class CreateDriverDto {
  @ApiProperty({ description: 'Nome completo do motorista' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres.' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres.' })
  name: string;

  @ApiProperty({ description: 'CPF (somente números)', example: '12345678901' })
  @IsString({ message: 'O CPF deve ser um texto.' })
  @MinLength(11, { message: 'O CPF deve ter no mínimo 11 dígitos.' })
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 dígitos.' })
  cpf: string;

  @ApiProperty({ description: 'Número da CNH', example: '01234567891' })
  @IsString({ message: 'O número da CNH deve ser um texto.' })
  @MinLength(9, { message: 'O número da CNH deve ter no mínimo 9 dígitos.' })
  @MaxLength(11, { message: 'O número da CNH deve ter no máximo 11 dígitos.' })
  licenseNumber: string;

  @ApiProperty({ description: 'Categoria da CNH', enum: LicenseCategory })
  @IsEnum(LicenseCategory, { message: 'A categoria da CNH selecionada é inválida.' })
  licenseCategory: LicenseCategory;

  @ApiProperty({ description: 'Data de validade da CNH' })
  @Type(() => Date)
  @IsDate({ message: 'A data de validade da CNH é inválida.' })
  licenseExpiration: Date;

  @ApiProperty({ description: 'Telefone', example: '41999997210' })
  @IsString({ message: 'O telefone deve ser um texto.' })
  @MinLength(10, { message: 'O telefone deve ter no mínimo 10 dígitos.' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 dígitos.' })
  phone: string;

  @ApiProperty({ description: 'E-mail' })
  @IsEmail({}, { message: 'O formato do e-mail é inválido.' })
  email: string;

  @ApiPropertyOptional({ description: 'Endereço completo' })
  @IsOptional()
  @IsString({ message: 'O endereço deve ser um texto.' })
  address?: string;

  @ApiPropertyOptional({ description: 'Cidade' })
  @IsOptional()
  @IsString({ message: 'A cidade deve ser um texto.' })
  city?: string;

  @ApiPropertyOptional({ description: 'CEP' })
  @IsOptional()
  @IsString({ message: 'O CEP deve ser um texto.' })
  zipCode?: string;

  @ApiPropertyOptional({ description: 'Plataformas de transporte (Uber, 99, InDriver...)' })
  @IsOptional()
  @IsArray({ message: 'As plataformas devem ser uma lista.' })
  @IsString({ each: true, message: 'Cada plataforma deve ser descrita em formato de texto.' })
  platforms?: string[];

  @ApiPropertyOptional({ description: 'Observações' })
  @IsOptional()
  @IsString({ message: 'As observações devem ser um texto.' })
  notes?: string;

  @ApiPropertyOptional({ enum: DriverStatus, description: 'Status do motorista' })
  @IsOptional()
  @IsEnum(DriverStatus, { message: 'O status do motorista selecionado é inválido.' })
  status?: DriverStatus;
}
